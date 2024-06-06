import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ClassValue } from 'clsx';
import { mergeClasses } from '../util/merge-classes';

@Component({
  selector: 'app-tile',
  standalone: true,
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
})
export class Tile {
  public readonly inputClass = input<ClassValue>('', { alias: 'class' });
  protected readonly computedClass = computed(() =>
    mergeClasses(
      'text-primary transition-all dark:text-neutral-100 ring-primary/5 dark:shadow-thick dark:from-neutral-800 dark:to-neutral-700 flex h-full flex-col items-center rounded-3xl bg-gradient-to-br from-gray-200 to-white p-8 shadow-lg ring-1 dark:ring-white/10 hover:bg-white/90 hover:drop-shadow-xl',
      this.inputClass(),
    ),
  );
}
