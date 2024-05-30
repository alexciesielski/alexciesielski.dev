import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ac-icon',
  standalone: true,
  template: `
    <svg [class]="svgClass" viewBox="0 0 24 24" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z">
      <path [attr.d]="icon" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  @Input({ alias: 'class' }) svgClass = '';
  @Input({ required: true }) icon!: string;
}
