import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TagComponent } from '../../components/tag';
import { PostAttributes } from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe, TagComponent],
  template: `
    @if (post$ | async; as post) {
      <article>
        <div class="mb-4 overflow-hidden">
          <img class="h-[25vh] w-full object-cover" [src]="post.attributes.coverImage" />
        </div>
        <div class="mb-2 flex items-center gap-4">
          @for (tag of post.attributes.tags; track tag) {
            <ac-tag [tag]="tag" />
          }
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-400">by: Alexander Ciesielski, {{ post.attributes.date | date }}</p>
        </div>
        <analog-markdown class="prose lg:prose-lg" [content]="post.content" />
      </article>
    }
  `,
  host: {
    class: 'block container mx-auto p-4',
  },
  styles: [
    `
      .post__image {
        max-height: 40vh;
      }
    `,
  ],
})
export default class HomeComponent {
  readonly post$ = injectContent<PostAttributes>({ param: 'slug', subdirectory: 'blog' });
}
