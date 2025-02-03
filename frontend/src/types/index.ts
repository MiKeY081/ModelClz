export interface User {
  id: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  name: string;
  email: string;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'assembly' | 'ceremony' | 'sports' | 'cultural';
  isLive?: boolean;
  streamUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  achiever: {
    name: string;
    role: 'student' | 'faculty';
    image?: string;
  };
  date: string;
  category: string;
}