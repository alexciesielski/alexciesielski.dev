import { injectContentFiles } from '@analogjs/content';
import { compareAsc } from 'date-fns';
import { PostAttributes } from '../post-attributes';

export function injectBlogPostAttributes() {
  return injectContentFiles<PostAttributes>((file) => file.filename.startsWith('/src/content/blog')).sort((a, b) =>
    compareAsc(new Date(b.attributes.date), new Date(a.attributes.date)),
  );
}
