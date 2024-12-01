'use client';

import { InputFile } from "@/components/ui/inputFile";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Post created successfully!");
        setTitle("");
        setDescription("");
        setSelectedFile(null);
      } else {
        const error = await response.json(); // Log the error response
        console.error("Error creating post:", error);
        setErrorMessage(error.error || "Error creating post.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-button2 text-white py-2 px-4 rounded hover:bg-[#784480] font-bold">
          Create a Post
        </DialogTrigger>
        <DialogContent className="bg-background text-main border-0 font-semibold">
          <DialogHeader>
            <DialogTitle className="text-xl">Create a New Post</DialogTitle>
            <DialogDescription className="text-button2">
              Fill in the details below to create a new post.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full text-black"
              required
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full text-black"
            ></textarea>
            <InputFile onChange={handleFileChange} />
            <button
              type="submit"
              className="bg-button2 text-white py-2 px-4 rounded hover:bg-[#784480] font-bold"
            >
              Create Post
            </button>
          </form>
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
