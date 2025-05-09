import React from 'react';
import { User } from '../types';
import { formatNumber } from '../utils/formatters';

interface ProfileHeaderProps {
  user: User;
  postCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, postCount }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* User Info */}
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {user.username}
          </h1>
          <h2 className="text-base text-gray-700 dark:text-gray-300 mb-4">
            {user.fullName}
          </h2>
          
          {/* Stats */}
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <div className="text-center">
              <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(postCount)}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">posts</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(user.followers)}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">followers</p>
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(user.following)}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">following</p>
            </div>
          </div>
          
          {/* Bio */}
          <p className="text-gray-700 dark:text-gray-300 max-w-md">
            {user.bio}
          </p>
        </div>
      </div>
      
      {/* Follow Button */}
      <button className="w-full md:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200">
        Follow
      </button>
    </div>
  );
};

export default ProfileHeader;