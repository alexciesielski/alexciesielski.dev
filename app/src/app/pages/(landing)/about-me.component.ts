import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'ac-about-me',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, NgScrollbar],
  template: `
    <div class="flex w-full items-center justify-between gap-x-4 p-4 xl:justify-around">
      <img
        [ngSrc]="'/profile.jpg'"
        alt="Alexander Ciesielski profile picture"
        class="h-15 w-15 ring-primary/5 rounded-full ring-1 dark:ring-white/10"
        width="60"
        height="60"
      />
      <div class="text-right leading-6">
        <h1 class="text-primary mb-2 text-2xl font-semibold dark:text-neutral-100">Alexander Ciesielski</h1>
        <h2 class="text-sm text-zinc-500 dark:text-zinc-400">Software Engineer<br />Angular Expert</h2>
      </div>
    </div>

    <ng-scrollbar class="block h-full" [visibility]="'hover'">
      <div class="mt-8 flex h-full flex-col justify-between gap-y-4 p-4 lg:gap-y-8 lg:text-lg lg:font-light">
        <p>Hey, welcome to my site!</p>
        <p>Having started coding at the age of 11 it has always been my biggest passion.</p>
        <p>
          As a software engineer I specialize in frontend development, creating beautiful and intuitive frontends with
          an added focus on clean and maintainable code.
        </p>
        <p>This is complemented by a strong interest in programming in general.</p>
        <p>
          I am also a big fan of open source and I contribute actively to many projects, not only by opening issues, but
          actively implementing features and fixing bugs.
        </p>
      </div>
    </ng-scrollbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {}
