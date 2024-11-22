import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let imageUrl = null;

  if (imageFile && imageFile instanceof File) {
    // Upload image to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("posts-image_url")
      .upload(`user-${user.id}/${imageFile.name}`, imageFile);

    if (uploadError || !data) {
      return NextResponse.json({ error: uploadError?.message || "Upload failed" }, { status: 500 });
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("posts-image_url")
      .getPublicUrl(data.path);

    imageUrl = publicUrlData?.publicUrl;
  }

  const pstDate = new Date().toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  // Insert post data into the database
  const { error: dbError } = await supabase.from("posts").insert({
    title,
    description,
    image_url: imageUrl,
    user_id: user.id,
    created_on: pstDate,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/posts", req.url));
}
