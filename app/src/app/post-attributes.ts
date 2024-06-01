export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags?: string[];
}

export interface AboutMeAttributes extends PostAttributes {
  availability: boolean;
}
