import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { Post } from '../types';
import { formatNumber } from '../utils/formatters';

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          to={`/post/${post.id}`}
          className="relative pb-[100%] bg-gray-100 dark:bg-gray-900 overflow-hidden group"
        >
          <img 
            src={post.imageUrl} 
            alt="" 
            className="absolute w-full h-full object-cover"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center text-white">
              <Heart size={20} className="fill-white" />
              <span className="ml-1 font-semibold">{formatNumber(post.likes.length)}</span>
            </div>
            <div className="flex items-center text-white">
              <MessageCircle size={20} />
              <span className="ml-1 font-semibold">{formatNumber(post.comments.length)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;