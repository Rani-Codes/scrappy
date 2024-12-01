import { createClient } from "@/app/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const { data: currentData, error: currentError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (currentError) {
      return NextResponse.json({ error: "Failed to fetch the current post data." }, { status: 500 });
    }

    if (!currentData) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("posts")
      .update({ title, description: description || null })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update the post." }, { status: 500 });
    }

    return NextResponse.json({ message: "Post updated successfully.", data: updatedData });
  } catch {
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
