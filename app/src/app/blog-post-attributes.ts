export interface BlogPostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  coverImageWidth: number;
  tags?: string[];
  date: Date | string;
}

export interface AboutMeAttributes extends BlogPostAttributes {
  availability: boolean;
}
