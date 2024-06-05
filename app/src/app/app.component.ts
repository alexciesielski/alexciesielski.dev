import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { mdiHome } from '@mdi/js';
import { filter, map, startWith } from 'rxjs';
import { Icon } from './components/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Icon, AsyncPipe],
  template: `
    @if (showHeader | async) {
      <header class="flex-0 px-8">
        <nav class="flex items-center gap-x-4 py-2">
          <h1></h1>

          @for (link of links; track link.url; let last = $last) {
            <a
              [routerLink]="link.url"
              class="text-primary/75 group flex cursor-pointer items-center gap-x-2 transition-all hover:scale-105 hover:fill-emerald-600 hover:text-emerald-600"
            >
              @if (link.icon) {
                <ac-icon [icon]="link.icon" class="fill-primary/75 h-6 group-hover:fill-emerald-600" />
              }

              {{ link.label }}
            </a>

            @if (!last) {
              /
            }
          }
        </nav>
      </header>
    }
    <main class="flex-1 overflow-auto p-4 {{ (showHeader | async) ? 'pt-0' : 'mx-auto' }}">
      <router-outlet />
    </main>
  `,
  host: {
    class: 'flex flex-col h-screen w-screen cursor-default',
  },
})
export class AppComponent {
  private readonly router = inject(Router);
  readonly showHeader = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(this.router.url),
    map(() => this.router.url !== '/'),
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
