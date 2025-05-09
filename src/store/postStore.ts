import { create } from 'zustand';
import { Post, Comment } from '../types';
import { posts as initialPosts } from '../data/posts';

interface PostState {
  posts: Post[];
  visiblePosts: number;
  searchTerm: string;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, text: string) => void;
  loadMorePosts: () => void;
  setSearchTerm: (term: string) => void;
  reset: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: initialPosts,
  visiblePosts: 6,
  searchTerm: '',
  
  likePost: (postId, userId) => set((state) => {
    const updatedPosts = state.posts.map(post => {
      if (post.id === postId && !post.likes.includes(userId)) {
        return { ...post, likes: [...post.likes, userId] };
      }
      return post;
    });
    return { posts: updatedPosts };
  }),
  
  unlikePost: (postId, userId) => set((state) => {
    const updatedPosts = state.posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes.filter(id => id !== userId) };
      }
      return post;
    });
    return { posts: updatedPosts };
  }),
  
  addComment: (postId, userId, text) => set((state) => {
    const timestamp = new Date().toISOString();
    const newComment: Comment = {
      id: `c${Date.now()}`,
      postId,
      userId,
      text,
      timestamp
    };
    
    const updatedPosts = state.posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [newComment, ...post.comments] };
      }
      return post;
    });
    
    return { posts: updatedPosts };
  }),
  
  loadMorePosts: () => set((state) => ({
    visiblePosts: state.visiblePosts + 6
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  reset: () => set({ 
    posts: initialPosts,
    visiblePosts: 6,
    searchTerm: '' 
  })
}));