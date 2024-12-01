'use client';

import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DeletePostProps {
  postId: string;
  fetchPosts: () => void;
}

const DeletePost = ({ postId, fetchPosts }: DeletePostProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/posts/delete/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts(); // Refresh the post list after deletion
        setIsDialogOpen(false); // Close the dialog after successful deletion
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Error deleting post.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
    }
  }, [postId, fetchPosts]);

  return (
    <div className="mt-2">
      {/* Trigger to open the delete confirmation dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="bg-red-500 text-white py-2 px-4 font-semibold rounded hover:bg-red-600">
          Delete Post
        </DialogTrigger>

        <DialogContent className="bg-background text-main border-0 font-semibold">
          <DialogHeader>
            <DialogTitle className="text-xl text-main">Confirm Delete</DialogTitle>
            <DialogDescription className="text-main">
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="bg-main text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Confirm Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default DeletePost;
