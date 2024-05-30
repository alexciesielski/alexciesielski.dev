import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PostAttributes } from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
      <article>
        <div class="mb-8 overflow-hidden">
          <img class="h-[25vh] w-full object-cover" [src]="post.attributes.coverImage" />
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
