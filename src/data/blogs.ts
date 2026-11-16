export interface BlogPost {
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    heading: string;
    text: string;
  }[];
  tags: string[];
  bodyHtml?: string;
  published?: boolean;
}

// Blog content is managed in the admin dashboard and loaded from the CMS API.
export const blogPosts: Record<string, BlogPost> = {};
