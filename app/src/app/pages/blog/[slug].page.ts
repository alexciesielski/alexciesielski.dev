import { injectContent, MarkdownComponent } from '@analogjs/content';
import { MetaTag, RouteMeta } from '@analogjs/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BlogPostAttributes } from '../../blog-post-attributes';
import { TagComponent } from '../../components/tag';

export const postMetaResolver: ResolveFn<MetaTag[]> = async (route) => {
  const postAttributes = await firstValueFrom(
    injectContent<BlogPostAttributes>({ param: 'slug', subdirectory: 'blog' }),
  );
  const { title, description, coverImage } = postAttributes.attributes;

  return [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Analog Team',
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: coverImage,
    },
  ];
};

export const routeMeta: RouteMeta = {
  meta: postMetaResolver,
};

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe, TagComponent],
  template: `
    @if (post$ | async; as post) {
      <article class="dark:text-white">
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
        <analog-markdown class="prose lg:prose-lg print:prose-sm dark:prose-invert" [content]="post.content" />
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
  readonly post$ = injectContent<BlogPostAttributes>({ param: 'slug', subdirectory: 'blog' });
}
