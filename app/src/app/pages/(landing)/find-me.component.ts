import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mdiGithub, mdiLinkedin } from '@mdi/js';
import { Icon } from '../../components/icon';

@Component({
  selector: 'ac-find-me',
  standalone: true,
  imports: [Icon],
  template: `
    <div class="w-full">
      <p class="text-primary text-xl font-normal tracking-tight lg:text-8xl dark:text-white">Find me on</p>
    </div>
    <div class="flex h-full w-full items-center justify-around">
      <a class="group w-auto transition-transform hover:scale-110" href="https://www.linkedin.com/in/alexciesielskidev">
        <ac-icon class="h-16 transition-colors group-hover:fill-emerald-500" [icon]="mdiLinkedin" />
      </a>
      <a class="group w-auto transition-transform hover:scale-110" href="https://www.github.com/alexciesielski">
        <ac-icon class="h-16 transition-colors group-hover:fill-emerald-500" [icon]="mdiGithub" />
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindMeComponent {
  readonly mdiGithub = mdiGithub;
  readonly mdiLinkedin = mdiLinkedin;
}
