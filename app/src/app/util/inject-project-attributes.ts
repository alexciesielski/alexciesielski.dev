import { injectContentFiles } from '@analogjs/content';
import { compareAsc } from 'date-fns';
import { ProjectAttributes } from '../project-attributes';

export function injectProjectAttributes() {
  return injectContentFiles<ProjectAttributes>((file) => file.filename.startsWith('/src/content/projects')).sort(
    (a, b) => compareAsc(new Date(b.attributes.start), new Date(a.attributes.start)),
  );
}
