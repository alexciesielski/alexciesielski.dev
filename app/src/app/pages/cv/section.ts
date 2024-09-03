import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: '[acSection]',
  standalone: true,
  imports: [],
  host: {
    class: 'flex flex-col gap-4',
  },
  template: `
    <h2 class="font-title pt-8 text-4xl print:pt-2 print:text-2xl">{{ header }}</h2>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVSection {
  @Input() header = '';
}
