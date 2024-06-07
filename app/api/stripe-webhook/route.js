import { NextResponse } from 'next/server';
import { handleCheckoutSessionCompleted } from '@/lib/actions';

const apiKey = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(apiKey);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// console.log('Stripe API Key:', apiKey);
// console.log('Stripe Webhook Secret:', endpointSecret);

// Function to read the raw body from the request
async function readRawBody(req) {
  const reader = req.body.getReader();
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const concatenatedChunks = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  );
  let offset = 0;
  for (const chunk of chunks) {
    concatenatedChunks.set(chunk, offset);
    offset += chunk.length;
  }
  const rawBody = new TextDecoder().decode(concatenatedChunks);
  return rawBody;
}


export async function POST(req) {
  let event;
  // console.log('Headers:', req.headers);
  // console.log('Request Method:', req.method);
  // console.log('Request Body:', req.body);

  try {
    const rawBody = await readRawBody(req);
    // Log rawBody and signature for debugging
    // console.log('Raw Body:', rawBody.toString());
    const signature = req.headers.get('stripe-signature');
    // console.log('Signature:', signature);

    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;

      // Get item purchased and quantity.
      const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);
      const quantity = lineItems.data[0].quantity

      // Add credits to user account.
      handleCheckoutSessionCompleted(checkoutSession.client_reference_id, quantity);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}
