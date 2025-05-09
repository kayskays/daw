export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postCount: number;
  totalLikes: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: string;
}