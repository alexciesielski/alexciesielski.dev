import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { mdiHome } from '@mdi/js';
import { inject as va } from '@vercel/analytics';
import { filter, map, shareReplay, startWith } from 'rxjs';
import { Icon } from './components/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Icon, AsyncPipe, NgClass],
  template: `
    @if (showHeader | async) {
      <header class="flex-0 px-8 shadow">
        <nav class="flex items-center gap-x-4 py-2 print:hidden">
          <h1></h1>

          @for (link of links; track link.url; let last = $last) {
            <a
              [routerLink]="link.url"
              class="text-primary/75 group flex cursor-pointer items-center gap-x-2 transition-all hover:scale-105 hover:fill-emerald-600 hover:text-emerald-600 dark:text-neutral-100"
            >
              @if (link.icon) {
                <ac-icon [icon]="link.icon" class="fill-foreground/75 h-6 w-6 group-hover:fill-emerald-600" />
              }

              {{ link.label }}
            </a>

            @if (!last) {
              <span>·</span>
            }
          }
        </nav>
      </header>
    }

    <main class="flex-1 overflow-auto p-4 print:p-0" [ngClass]="(showHeader | async) ? 'pt-0' : 'mx-auto'">
      <router-outlet />
    </main>
  `,
  host: {
    class: 'flex flex-col h-dvh print:h-auto w-screen cursor-default dark:bg-neutral-800',
  },
})
export class AppComponent {
  constructor() {
    va({ framework: 'angular' });
  }

  private readonly router = inject(Router);
  readonly showHeader = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(this.router.url),
    map(() => this.router.url !== '/'),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly links = [
    {
      url: '/',
      label: 'alexciesielski.dev',
      icon: mdiHome,
    },
    {
      url: '/blog',
      label: 'Blog',
    },
  ];
}
