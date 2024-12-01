import { createClient } from "@/app/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data: postData, error: fetchError } = await supabase
      .from("posts")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete the post." }, { status: 500 });
    }

    return NextResponse.json({ message: "Post deleted successfully." });
  } catch {
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
