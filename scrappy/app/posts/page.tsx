'use server';
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import GreetUser from "../auth/components/greetUser";
import CreatePost from "./components/createPost";
import ShowAllPosts from "./components/showAllPosts";

const page = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/auth/login");
  }


  return (
    <div>
        <GreetUser />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold my-4 text-center">Scrapbook Posts</h1>
          <CreatePost/>
        </div>
        <ShowAllPosts/>

    </div>
  );
};

export default page;
