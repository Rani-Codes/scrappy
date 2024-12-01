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
      <div className="bg-background text-main font-semibold w-full flex justify-between p-4 text-lg">
        <p>
        Hello&nbsp;
        <code className="font-mono font-bold underline">{displayName}</code>
        </p>
        <button 
        type="button"
        onClick={() => {
            signout();
        }}
        >
        Sign out now
    </button> 
    </div>
    );
  }
};

export default GreetUser;
