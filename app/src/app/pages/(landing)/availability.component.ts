import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ac-availability',
  standalone: true,
  template: `
    <p class="grid h-full place-content-center text-2xl font-normal tracking-tight lg:block lg:h-auto lg:text-7xl">
      Available for work
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityComponent {}
