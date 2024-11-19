"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

const LoginCallback = () => {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleCallback = async () => {
            const { data: session } = await supabase.auth.getSession();
            if (session) {
                router.push("/posts");
            } else {
                router.push("/auth/login");
            }
        };

        handleCallback();
    }, [router, supabase]);

    return <p>Processing...</p>;
};

export default LoginCallback;
