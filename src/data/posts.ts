import { Post, Comment } from '../types';
import { format, subHours, subMinutes, subDays } from 'date-fns';
import l1 from '../images/l1.jpg';
import l2 from '../images/l2.jpg';

// Helper function to generate timestamp
const generateTimestamp = (hoursAgo: number): string => {
  return format(subHours(new Date(), hoursAgo), "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

// Generate comments
const generateComments = (postId: string, count: number): Comment[] => {
  const comments: Comment[] = [];
  for (let i = 0; i < count; i++) {
    const randomUserId = `u${Math.floor(Math.random() * 20) + 1}`;
    const hoursAgo = Math.floor(Math.random() * 48);
    comments.push({
      id: `c${postId}-${i}`,
      postId,
      userId: randomUserId,
      text: [
        "Love this!",
        "Amazing shot!",
        "This is beautiful 😍",
        "Wow, incredible!",
        "Can't wait to see more!",
        "This is perfect",
        "Absolutely stunning",
        "This made my day",
        "Brilliant capture",
        "You're so talented!"
      ][Math.floor(Math.random() * 10)],
      timestamp: generateTimestamp(hoursAgo)
    });
  }
  return comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate random likes
const generateLikes = (postId: string): string[] => {
  const likes: string[] = [];
  const likeCount = Math.floor(Math.random() * 200) + 10;
  
  for (let i = 0; i < likeCount; i++) {
    const randomUserId = `u${Math.floor(Math.random() * 20) + 1}`;
    if (!likes.includes(randomUserId)) {
      likes.push(randomUserId);
    }
  }
  
  return likes;
};

// Mock posts data
export const posts: Post[] = [
  {
    id: "p1",
    userId: "u1",
    imageUrl: l1,
    caption: "GOJO SATURU ",
    likes: generateLikes("p1"),
    comments: generateComments("p1", 8),
    timestamp: generateTimestamp(2)
  },
  {
    id: "p2",
    userId: "u2",
    imageUrl: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Golden hour photography is magical ✨ #photography #sunset",
    likes: generateLikes("p2"),
    comments: generateComments("p2", 12),
    timestamp: generateTimestamp(4)
  },
  {
    id: "p3",
    userId: "u3",
    imageUrl: "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Exploring hidden gems in Paris 🇫🇷 #travel #wanderlust",
    likes: generateLikes("p3"),
    comments: generateComments("p3", 7),
    timestamp: generateTimestamp(8)
  },
  {
    id: "p4",
    userId: "u4",
    imageUrl: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Just built a new feature for my app! #coding #developer",
    likes: generateLikes("p4"),
    comments: generateComments("p4", 5),
    timestamp: generateTimestamp(12)
  },
  {
    id: "p5",
    userId: "u5",
    imageUrl: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Morning workout done! 💪 #fitness #motivation",
    likes: generateLikes("p5"),
    comments: generateComments("p5", 14),
    timestamp: generateTimestamp(16)
  },
  {
    id: "p6",
    userId: "u6",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Today's special: Homemade pasta with fresh ingredients 🍝 #food #cooking",
    likes: generateLikes("p6"),
    comments: generateComments("p6", 9),
    timestamp: generateTimestamp(20)
  },
  {
    id: "p7",
    userId: "u7",
    imageUrl: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "New digital artwork finished today! #art #digital",
    likes: generateLikes("p7"),
    comments: generateComments("p7", 11),
    timestamp: generateTimestamp(24)
  },
  {
    id: "p8",
    userId: "u8",
    imageUrl: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Testing the new iPhone camera. Impressive! #tech #apple",
    likes: generateLikes("p8"),
    comments: generateComments("p8", 6),
    timestamp: generateTimestamp(30)
  },
  {
    id: "p9",
    userId: "u9",
    imageUrl: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Spotted this beautiful butterfly in the garden 🦋 #nature #wildlife",
    likes: generateLikes("p9"),
    comments: generateComments("p9", 4),
    timestamp: generateTimestamp(36)
  },
  {
    id: "p10",
    userId: "u10",
    imageUrl: "https://images.pexels.com/photos/4087992/pexels-photo-4087992.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Just recorded a new track in the studio 🎵 #music #producer",
    likes: generateLikes("p10"),
    comments: generateComments("p10", 15),
    timestamp: generateTimestamp(42)
  },
  {
    id: "p11",
    userId: "u11",
    imageUrl: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Fall fashion favorites 🍂 #fashion #style",
    likes: generateLikes("p11"),
    comments: generateComments("p11", 8),
    timestamp: generateTimestamp(48)
  },
  {
    id: "p12",
    userId: "u12",
    imageUrl: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Hiking in the mountains was worth every step #adventure #travel",
    likes: generateLikes("p12"),
    comments: generateComments("p12", 7),
    timestamp: generateTimestamp(54)
  },
  {
    id: "p13",
    userId: "u13",
    imageUrl: "https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Current read: 'The Midnight Library' 📚 #books #reading",
    likes: generateLikes("p13"),
    comments: generateComments("p13", 5),
    timestamp: generateTimestamp(60)
  },
  {
    id: "p14",
    userId: "u14",
    imageUrl: "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Push your limits every day 💯 #fitness #gym",
    likes: generateLikes("p14"),
    comments: generateComments("p14", 13),
    timestamp: generateTimestamp(66)
  },
  {
    id: "p15",
    userId: "u15",
    imageUrl: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Just finished redecorating this living room ✨ #interiordesign #homedecor",
    likes: generateLikes("p15"),
    comments: generateComments("p15", 10),
    timestamp: generateTimestamp(72)
  },
  {
    id: "p16",
    userId: "u16",
    imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Made this chocolate cake from scratch today 🍰 #baking #dessert",
    likes: generateLikes("p16"),
    comments: generateComments("p16", 8),
    timestamp: generateTimestamp(78)
  },
  {
    id: "p17",
    userId: "u17",
    imageUrl: "https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "New mural completed downtown 🎨 #streetart #artist",
    likes: generateLikes("p17"),
    comments: generateComments("p17", 6),
    timestamp: generateTimestamp(84)
  },
  {
    id: "p18",
    userId: "u18",
    imageUrl: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Epic win today! New high score 🎮 #gaming #esports",
    likes: generateLikes("p18"),
    comments: generateComments("p18", 14),
    timestamp: generateTimestamp(90)
  },
  {
    id: "p19",
    userId: "u19",
    imageUrl: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "My plant collection is growing! 🌿 #plants #urbanjungle",
    likes: generateLikes("p19"),
    comments: generateComments("p19", 7),
    timestamp: generateTimestamp(96)
  },
  {
    id: "p20",
    userId: "u20",
    imageUrl: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Unboxing the latest tech gadget 📱 #technology #review",
    likes: generateLikes("p20"),
    comments: generateComments("p20", 9),
    timestamp: generateTimestamp(102)
  },
  {
    id: "p21",
    userId: "u1",
    imageUrl: l2,
    caption: "SUKUNA..ART",
    likes: generateLikes("p21"),
    comments: generateComments("p21", 11),
    timestamp: generateTimestamp(108)
  },
  {
    id: "p22",
    userId: "u2",
    imageUrl: "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Moonlight photography session 🌙 #night #photography",
    likes: generateLikes("p22"),
    comments: generateComments("p22", 5),
    timestamp: generateTimestamp(114)
  },
  {
    id: "p23",
    userId: "u3",
    imageUrl: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Breathtaking views from this hike 🏔️ #travel #mountains",
    likes: generateLikes("p23"),
    comments: generateComments("p23", 8),
    timestamp: generateTimestamp(120)
  },
  {
    id: "p24",
    userId: "u4",
    imageUrl: "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Code review session with the team #programming #teamwork",
    likes: generateLikes("p24"),
    comments: generateComments("p24", 4),
    timestamp: generateTimestamp(126)
  },
  {
    id: "p25",
    userId: "u5",
    imageUrl: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "New healthy meal prep for the week 🥗 #nutrition #healthyeating",
    likes: generateLikes("p25"),
    comments: generateComments("p25", 12),
    timestamp: generateTimestamp(132)
  }
];

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};

export const searchPosts = (searchTerm: string): Post[] => {
  const term = searchTerm.toLowerCase();
  return posts.filter(post => post.caption.toLowerCase().includes(term));
};