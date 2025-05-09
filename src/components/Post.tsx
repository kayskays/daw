import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { User, Post as PostType } from '../types';
import { formatRelativeTime, formatNumber } from '../utils/formatters';
import { getUserById } from '../data/users';
import { usePostStore } from '../store/postStore';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { likePost, unlikePost, addComment } = usePostStore();
  
  // Hardcoded current user for demo purposes
  const currentUserId = "u1";
  const isLiked = post.likes.includes(currentUserId);
  
  // Get post author
  const author = getUserById(post.userId);
  
  if (!author) return null;

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikePost(post.id, currentUserId);
    } else {
      likePost(post.id, currentUserId);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, currentUserId, newComment);
      setNewComment('');
    }
  };

  const recentComments = showAllComments 
    ? post.comments 
    : post.comments.slice(0, 2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 transition-colors duration-200">
      {/* Post Header */}
      <div className="p-4 flex items-center">
        <Link to={`/profile/${author.id}`}>
          <img 
            src={author.avatar} 
            alt={author.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div className="ml-3">
          <Link to={`/profile/${author.id}`} className="font-semibold text-gray-900 dark:text-white hover:underline">
            {author.username}
          </Link>
        </div>
      </div>
      
      {/* Post Image */}
      <Link to={`/post/${post.id}`}>
        <div className="relative pb-[100%] bg-gray-100 dark:bg-gray-900">
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="absolute w-full h-full object-cover"
          />
        </div>
      </Link>
      
      {/* Post Actions */}
      <div className="p-4">
        <div className="flex space-x-4 mb-2">
          <button 
            onClick={handleLikeToggle}
            className="focus:outline-none group transition-colors"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart 
              size={24} 
              className={`${
                isLiked 
                  ? 'text-pink-500 fill-pink-500' 
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-pink-500'
              } transition-colors duration-200`}
            />
          </button>
          <Link to={`/post/${post.id}`} className="focus:outline-none group" aria-label="Comment">
            <MessageCircle 
              size={24} 
              className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200"
            />
          </Link>
          <button className="focus:outline-none group ml-auto" aria-label="Share">
            <Share2 
              size={24} 
              className="text-gray-700 dark:text-gray-300 group-hover:text-purple-500 transition-colors duration-200"
            />
          </button>
        </div>
        
        {/* Likes Count */}
        <div className="font-semibold text-gray-900 dark:text-white mb-2">
          {formatNumber(post.likes.length)} likes
        </div>
        
        {/* Caption */}
        <div className="mb-2">
          <Link to={`/profile/${author.id}`} className="font-semibold text-gray-900 dark:text-white mr-2">
            {author.username}
          </Link>
          <span className="text-gray-700 dark:text-gray-300">{post.caption}</span>
        </div>
        
        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="mb-3">
            {post.comments.length > 2 && !showAllComments && (
              <button 
                onClick={() => setShowAllComments(true)}
                className="text-gray-500 dark:text-gray-400 text-sm mb-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                View all {post.comments.length} comments
              </button>
            )}
            
            {recentComments.map(comment => {
              const commentUser = getUserById(comment.userId);
              return commentUser ? (
                <div key={comment.id} className="mb-1">
                  <Link to={`/profile/${commentUser.id}`} className="font-semibold text-gray-900 dark:text-white mr-2">
                    {commentUser.username}
                  </Link>
                  <span className="text-gray-700 dark:text-gray-300">{comment.text}</span>
                </div>
              ) : null;
            })}
          </div>
        )}
        
        {/* Timestamp */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {formatRelativeTime(post.timestamp)}
        </div>
        
        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="flex items-center border-t border-gray-200 dark:border-gray-700 pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className={`ml-2 font-semibold ${
              newComment.trim() 
                ? 'text-blue-500 hover:text-blue-700 dark:hover:text-blue-400' 
                : 'text-blue-300 dark:text-blue-700 cursor-not-allowed'
            } transition-colors`}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;