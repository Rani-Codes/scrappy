'use server';
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import GreetUser from "../auth/components/greetUser";
import CreatePost from "./components/createPost";

const page = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/auth/login");
  }


  return (
    <div>
      <GreetUser />
      <CreatePost/>
    </div>
  );
};

export default page;
