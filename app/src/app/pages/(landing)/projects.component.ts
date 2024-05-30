import { injectContentFiles } from '@analogjs/content';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon';
import { ProjectAttributes } from '../../project-attributes';

@Component({
  selector: 'ac-projects',
  standalone: true,
  imports: [Icon],
  template: `
    <div class="grid h-full w-full grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
      @for (project of projects; track project.slug) {
        <a
          class="z-30 flex h-full w-full flex-col overflow-hidden border border-red-500  hover:text-emerald-600"
          [href]="'/projects/' + project.slug"
        >
          <div class="project-info tracking-tight transition-all lg:text-6xl">
            {{ project.attributes.title }}
          </div>
        </a>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly projects = injectContentFiles<ProjectAttributes>((file) =>
    file.filename.startsWith('/src/content/projects'),
  );
}
