import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getUserByUsername } from '../data/users';
import { getPostsByUserId } from '../data/posts';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  
  // Try to get user by ID first, then by username
  const user = userId ? (
    getUserById(userId) || getUserByUsername(userId)
  ) : null;
  
  const posts = user ? getPostsByUserId(user.id) : [];
  
  // Redirect if user not found
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">User not found</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go to home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <ProfileHeader user={user} postCount={posts.length} />
      
      {/* Tabs */}
      <div className="border-t border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-medium uppercase text-xs tracking-wider ${
              activeTab === 'posts' 
                ? 'border-t-2 border-purple-600 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400'
            } transition-colors`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-3 font-medium uppercase text-xs tracking-wider ${
              activeTab === 'saved' 
                ? 'border-t-2 border-purple-600 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400'
            } transition-colors`}
          >
            Saved
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            className={`px-6 py-3 font-medium uppercase text-xs tracking-wider ${
              activeTab === 'tagged' 
                ? 'border-t-2 border-purple-600 text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400'
            } transition-colors`}
          >
            Tagged
          </button>
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'posts' && (
        posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No posts yet.</p>
          </div>
        )
      )}
      
      {activeTab === 'saved' && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No saved posts.</p>
        </div>
      )}
      
      {activeTab === 'tagged' && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No tagged posts.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;