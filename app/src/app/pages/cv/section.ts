import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: '[acSection]',
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex flex-col gap-4',
  },
  template: `
    <h2 class="font-title pt-8 text-4xl print:pt-2 print:text-2xl">
      @if (isTemplateRef(header)) {
        <ng-template [ngTemplateOutlet]="header"></ng-template>
      } @else {
        {{ header }}
      }
    </h2>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVSection {
  @Input() header: string | TemplateRef<unknown> = '';

  isTemplateRef(value: unknown): value is TemplateRef<unknown> {
    return value instanceof TemplateRef;
  }
}
