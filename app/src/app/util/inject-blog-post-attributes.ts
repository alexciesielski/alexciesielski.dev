import { injectContentFiles } from '@analogjs/content';
import { compareAsc } from 'date-fns';
import { BlogPostAttributes } from '../blog-post-attributes';

export function injectBlogPostAttributes() {
  return injectContentFiles<BlogPostAttributes>((file) => file.filename.startsWith('/src/content/blog')).sort((a, b) =>
    compareAsc(new Date(b.attributes.date), new Date(a.attributes.date)),
  );
}
