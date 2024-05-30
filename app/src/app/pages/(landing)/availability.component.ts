import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ac-availability',
  standalone: true,
  template: `
    <p class="text-primary text-2xl font-normal tracking-tight lg:text-7xl dark:text-white">Available for freelance</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityComponent {}
