import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mdiGithub, mdiLinkedin, mdiReddit, mdiStackOverflow } from '@mdi/js';
import { Icon } from '../../components/icon';

@Component({
  selector: 'ac-find-me',
  standalone: true,
  imports: [Icon],
  template: `
    <div class="flex h-full w-full flex-col justify-around">
      <p class="text-primary text-xl font-normal tracking-tight lg:text-7xl dark:text-neutral-100">Find me on</p>
      <div class="flex h-full w-full items-center justify-around">
        @for (findMeOn of findMeOns; track findMeOn.href) {
          <a class="group w-auto p-1 transition-transform hover:scale-110 dark:fill-neutral-200" [href]="findMeOn.href">
            <ac-icon
              class="h-16 transition-colors group-hover:fill-emerald-600 dark:group-hover:fill-emerald-200"
              [icon]="findMeOn.icon"
            />
          </a>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindMeComponent {
  readonly findMeOns = [
    {
      href: 'https://www.linkedin.com/in/alexciesielskidev',
      icon: mdiLinkedin,
    },
    {
      href: 'https://www.github.com/alexciesielski',
      icon: mdiGithub,
    },
    {
      href: 'https://www.reddit.com/user/alexciesielski/',
      icon: mdiReddit,
    },
    {
      href: 'https://stackoverflow.com/users/1808126/alexander-ciesielski',
      icon: mdiStackOverflow,
    },
  ];
}
