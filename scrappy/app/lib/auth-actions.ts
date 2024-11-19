"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/auth/logout");
}
  

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login-callback`,
        queryParams: {
        access_type: "offline",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
