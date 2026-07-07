export type PostStatus = 'draft' | 'published';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  status: PostStatus;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: boolean;
  isLiveOnSite?: boolean;
};

export type CreateBlogPostInput = {
  title: string;
  excerpt?: string;
  content: string;
  tag?: string;
  status?: PostStatus;
};

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;
