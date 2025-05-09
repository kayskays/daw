import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { getPostById } from '../data/posts';
import { getUserById } from '../data/users';
import { formatRelativeTime } from '../utils/formatters';
import { usePostStore } from '../store/postStore';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { likePost, unlikePost, addComment, posts } = usePostStore();
  
  // Get the current post from the store
  const post = posts.find(p => p.id === postId);
  
  // Hardcoded current user for demo purposes
  const currentUserId = "u1";
  
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Post not found</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go to home
        </button>
      </div>
    );
  }
  
  const author = getUserById(post.userId);
  const isLiked = post.likes.includes(currentUserId);
  
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

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <div className="md:flex">
          {/* Post Image - Takes full width on mobile, half on desktop */}
          <div className="md:w-1/2 relative pb-[100%] md:pb-0 md:h-auto bg-gray-100 dark:bg-gray-900">
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="absolute w-full h-full object-cover md:relative"
            />
          </div>
          
          {/* Post Details */}
          <div className="md:w-1/2 flex flex-col">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <Link to={`/profile/${author.id}`}>
                <img 
                  src={author.avatar} 
                  alt={author.username} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
              <div className="ml-3">
                <Link to={`/profile/${author.id}`} className="font-semibold text-gray-900 dark:text-white hover:underline">
                  {author.username}
                </Link>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="p-4 flex-1 overflow-y-auto max-h-96">
              {/* Caption */}
              <div className="flex mb-4">
                <Link to={`/profile/${author.id}`}>
                  <img 
                    src={author.avatar} 
                    alt={author.username} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
                <div className="ml-3">
                  <div>
                    <Link to={`/profile/${author.id}`} className="font-semibold text-gray-900 dark:text-white mr-2">
                      {author.username}
                    </Link>
                    <span className="text-gray-700 dark:text-gray-300">{post.caption}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatRelativeTime(post.timestamp)}
                  </div>
                </div>
              </div>
              
              {/* Comments */}
              <div className="space-y-4">
                {post.comments.map(comment => {
                  const commentUser = getUserById(comment.userId);
                  return commentUser ? (
                    <div key={comment.id} className="flex">
                      <Link to={`/profile/${commentUser.id}`}>
                        <img 
                          src={commentUser.avatar} 
                          alt={commentUser.username} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </Link>
                      <div className="ml-3">
                        <div>
                          <Link to={`/profile/${commentUser.id}`} className="font-semibold text-gray-900 dark:text-white mr-2">
                            {commentUser.username}
                          </Link>
                          <span className="text-gray-700 dark:text-gray-300">{comment.text}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatRelativeTime(comment.timestamp)}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            {/* Post Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between mb-4">
                <div className="flex space-x-4">
                  <button 
                    onClick={handleLikeToggle}
                    className="focus:outline-none group"
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
                  <button className="focus:outline-none group" aria-label="Comment">
                    <MessageCircle 
                      size={24} 
                      className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </button>
                  <button className="focus:outline-none group" aria-label="Share">
                    <Share2 
                      size={24} 
                      className="text-gray-700 dark:text-gray-300 group-hover:text-purple-500 transition-colors duration-200"
                    />
                  </button>
                </div>
                <button className="focus:outline-none group" aria-label="Save">
                  <Bookmark 
                    size={24} 
                    className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors duration-200"
                  />
                </button>
              </div>
              
              {/* Likes Count */}
              <div className="font-semibold text-gray-900 dark:text-white mb-2">
                {post.likes.length} likes
              </div>
              
              {/* Timestamp */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {formatRelativeTime(post.timestamp)}
              </div>
              
              {/* Add Comment */}
              <form onSubmit={handleCommentSubmit} className="flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default PostDetail;