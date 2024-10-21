import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Profile from "./profile";

export default async function UserProfile() {
    const userId = (await createClient().auth.getUser()).data.user?.id
    
    return (
        <Tabs defaultValue="profile">
            <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                {/* <TabsTrigger value="cases">Posted cases</TabsTrigger> */}
            </TabsList>
            <TabsContent value="profile">
                <Profile userId={userId!}/>
            </TabsContent>
        </Tabs>
    )
}