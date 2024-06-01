import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ac-about-me',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe],
  template: `
    <div class="relative flex items-center justify-between gap-x-4">
      <img
        ngSrc="profile.jpg"
        alt="Alexander Ciesielski profile picture"
        class="h-15 w-15 ring-primary/5 rounded-full ring-1 dark:ring-white/10"
        width="60"
        height="60"
      />
      <div class="leading-6">
        <p class="text-primary text-2xl font-semibold dark:text-white">Alexander Ciesielski</p>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">Software Engineer, Angular Expert</p>
      </div>
    </div>

    <div class="mt-4">
      <!-- @if (aboutMeMarkdown | async; as markdown) { -->
      <!-- <analog-markdown [content]="markdown.content"></analog-markdown> -->
      <!-- content {{ markdown.content }} / -->
      <!-- } -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  // readonly aboutMeMarkdown = injectContent({ customFilename: 'about-me' });
}
