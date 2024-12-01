'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UpdatePostProps {
  postId: string;
  currentTitle: string;
  currentDescription: string;
  fetchPosts: () => void;
}

const UpdatePost = ({ postId, currentTitle, currentDescription, fetchPosts }: UpdatePostProps) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Update the form fields when the post data changes
    setTitle(currentTitle);
    setDescription(currentDescription);
  }, [currentTitle, currentDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!title) {
      setErrorMessage("Title is required.");
      return;
    }

    try {
      const response = await fetch(`/api/posts/update/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setSuccessMessage("Post updated successfully!");
        fetchPosts(); // Refresh the post list
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Error updating post.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
        Edit Post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
          <DialogDescription>Modify the post details below and save the changes.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
          ></textarea>
          <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Save Changes
          </button>
        </form>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePost;
