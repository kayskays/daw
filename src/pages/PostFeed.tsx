import React, { useEffect, useRef, useCallback } from 'react';
import Post from '../components/Post';
import { usePostStore } from '../store/postStore';

const PostFeed: React.FC = () => {
  const { posts, visiblePosts, loadMorePosts, searchTerm } = usePostStore();
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Filter posts based on search term
  const filteredPosts = searchTerm
    ? posts.filter(post => 
        post.caption.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;
  
  // Get visible posts
  const postsToShow = filteredPosts.slice(0, visiblePosts);
  
  // Setup the intersection observer for infinite scrolling
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && postsToShow.length < filteredPosts.length) {
        loadMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [postsToShow.length, filteredPosts.length, loadMorePosts]);

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      {searchTerm && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Search results for "{searchTerm}"
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      
      {postsToShow.length > 0 ? (
        postsToShow.map((post, index) => {
          if (index === postsToShow.length - 1) {
            return (
              <div key={post.id} ref={lastPostRef}>
                <Post post={post} />
              </div>
            );
          } else {
            return <Post key={post.id} post={post} />;
          }
        })
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchTerm 
              ? "No posts found matching your search." 
              : "No posts to show. Follow some users to see their posts!"}
          </p>
        </div>
      )}
      
      {postsToShow.length < filteredPosts.length && (
        <div className="flex justify-center py-4">
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            Loading more posts...
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFeed;