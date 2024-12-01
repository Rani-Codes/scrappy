"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import { signout } from "../../lib/auth-actions";

// Use the GoogleUser interface
const GreetUser = () => {
  const [user, setUser] = useState<GoogleUser | null>(null); // Apply type
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("User fetched in GreetUser:", user);
        setUser(user as GoogleUser); // Type assertion
      }
    };
    fetchUser();
  }, []);

  if (user) {
    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || "User";
    return (
      <p className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Hello&nbsp;
        <code className="font-mono font-bold">{displayName}!</code>
        <button 
        type="button"
        onClick={() => {
            signout();
        }}
        >
        Sign out now
    </button>      </p>
    );
  }
};

export default GreetUser;
