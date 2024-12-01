"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

const LoginCallback = () => {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error || !data.session) {
                    router.push("/auth/login");
                    return;
                }

                const { id, email, user_metadata } = data.session.user;
                if (!email || !user_metadata?.full_name) {
                    router.push("/auth/login");
                    return;
                }

                const { error: dbError } = await supabase.from("users").upsert({
                    id,
                    email,
                    username: user_metadata.full_name,
                    pfp: user_metadata.picture || null,
                });

                if (dbError) {
                    router.push("/auth/login");
                    return;
                }

                router.push("/posts");
            } catch {
                router.push("/auth/login");
            }
        };

        handleCallback();
    }, [router, supabase]);

    return <p className="text-main text-lg">Processing...</p>;
};

export default LoginCallback;
