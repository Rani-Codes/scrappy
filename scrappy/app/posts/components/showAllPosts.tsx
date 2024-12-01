'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { Post } from '@/app/posts/types/post';
import UpdatePost from './updatePost'; // Import the UpdatePost component
import DeletePost from './deletePost';

const ScrapbookPosts = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, users(username)')
      .order('created_on', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
        fetchPosts(); // Refetch all posts on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchPosts]);

  useEffect(() => {
    // Fetch current user to display edit button only for user's posts
    const fetchCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setCurrentUser(data?.user || null); // Store the user object from the 'data' field
    };

    fetchCurrentUser();
  }, [supabase]);

  useEffect(() => {
    // Observe changes to the container's size to trigger re-layout
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        positionPosts(); // Re-position posts when the container is resized
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Recalculate post positions whenever the posts are updated
    positionPosts();
  }, [posts]);

  const positionPosts = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const gap = 16; // Gap between posts

    // Adjust column widths based on the screen width
    let columnWidth = 270; // Default column width for small screens
    let numColumns = 1; // Default number of columns for small screens

    if (containerWidth >= 1024) { // Large screens (desktops)
      columnWidth = 350;
      numColumns = 3;
    } else if (containerWidth >= 768) { // Medium screens (tablets)
      columnWidth = 325;
      numColumns = 2;
    }

    const columnHeights = new Array(numColumns).fill(0); // Initialize the column heights

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const columnIndex = index % numColumns; // Find which column this post should be placed in

      element.style.position = 'absolute';
      element.style.width = `${columnWidth}px`;
      // Fix centering of posts in columns for small screens
      const leftOffset = (containerWidth - numColumns * (columnWidth + gap)) / 2 + columnIndex * (columnWidth + gap);
      element.style.left = `${leftOffset}px`; // Center the columns
      element.style.top = `${columnHeights[columnIndex]}px`;

      // Update column height after positioning the post
      columnHeights[columnIndex] += element.offsetHeight + gap;
    });

    // Adjust the container height to fit the tallest column
    container.style.height = `${Math.max(...columnHeights)}px`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={containerRef} className="relative w-full">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post Image"
                className="w-full h-auto object-cover rounded-md"
                style={{ maxHeight: '300px' }}
              />
            )}
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong>Created on:</strong>{' '}
                {new Date(post.created_on).toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                })}
              </p>
              <p>
                <strong>Created by:</strong> {post.users.username}
              </p>

              {/* Show the Edit Post button only if the current user is the creator of the post */}
              {currentUser && currentUser.id === post.user_id && (
                <div className='flex justify-between items-center'>
                <UpdatePost
                  postId={post.id}
                  currentTitle={post.title}
                  currentDescription={post.description}
                  fetchPosts={fetchPosts}
                />
                <DeletePost postId={post.id} fetchPosts={fetchPosts} /> {/* Add DeletePost component */}
              </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrapbookPosts;
