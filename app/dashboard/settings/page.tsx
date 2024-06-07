import { fetchUserInfo } from "@/lib/actions";
import SettingsForms from "./settings-forms";
  
 
export default async function Page() {
    const userInfo = await fetchUserInfo();

    if (!userInfo) throw new Error('Could not find user information.')
  
  return (
    <>
      <div className="flex flex-col items-center min-h-screen gap-4 p-4 sm:pl-20">
        <SettingsForms paymentLink={userInfo.paymentLink} credits={userInfo.credits}/>
      </div>
    </>
  )
};