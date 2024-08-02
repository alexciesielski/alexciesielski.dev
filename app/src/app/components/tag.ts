import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ac-tag',
  standalone: true,
  template: ` #{{ tag }} `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'rounded bg-gray-100 p-1 text-sm text-gray-500 truncate',
  },
})
export class TagComponent {
  @Input() tag = '';
}
