import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { mdiHelp } from '@mdi/js';
import { differenceInCalendarMonths, differenceInCalendarYears } from 'date-fns';
import { Icon } from '../../components/icon';
import { Tooltip } from '../../components/tooltip';
import { ProjectAttributes, TechAttributes } from '../../project-attributes';

@Component({
  selector: 'ac-project',
  standalone: true,
  imports: [Tooltip, DatePipe, MarkdownComponent, Icon],
  styles: `
    .project-details-panel.expanded {
      grid-template-rows: 1fr;
    }

    .analog-markdown p {
      break-inside: avoid;
    }
  `,
  template: `
    @if (uiProject(); as project) {
      <div class="flex gap-4">
        <img
          class="mt-1 aspect-square h-12 rounded"
          [src]="project.attributes.orgIconUrl"
          [alt]="project.attributes.org + ' logo'"
        />

        <div class="flex w-full flex-col gap-1">
          <div class="font-title flex flex-wrap items-center gap-2 text-xl">
            <h3>{{ project.attributes.title }}</h3>
            <span>＠</span>
            <a
              class="underline print:no-underline"
              [aria-describedby]="project.attributes.org"
              [hlmTooltipTrigger]="project.attributes.orgDescription"
              [position]="'right'"
              [href]="project.attributes.orgUrl"
              target="_blank"
            >
              {{ project.attributes.org }}
            </a>
          </div>

          <div class="text-xs text-gray-400 dark:text-gray-100">
            <span>
              {{ project.attributes.start | date }} -
              @if (project.attributes.end) {
                {{ project.attributes.end | date }}
              }
            </span>

            @if (project.attributes.end) {
              <span>·</span>
              @if (project.attributes.durationInMonths >= 12) {
                <span> {{ project.attributes.durationInYears }} years </span>
              } @else {
                <span> {{ project.attributes.durationInMonths }} months </span>
              }
            }

            <span>·</span>

            <span>
              {{ project.attributes.location }}
              @if (project.attributes.remote) {
                <span>· Remote</span>
              } @else {
                <span>· On-site</span>
              }
            </span>
          </div>

          <div class="inline w-full">
            <analog-markdown
              class="prose lg:prose-lg print:prose-sm dark:prose-invert mr-2 inline [&>.analog-markdown]:inline"
              [content]="project.attributes.description"
            />

            <button
              class="underline print:hidden"
              style="text-decoration-style: dotted"
              (click)="toggleExpanded.emit()"
            >
              {{ expanded() ? 'Show less ⤴' : 'Show more ⤵' }}
            </button>
          </div>

          <div
            class="transition-all project-details-panel print:block grid {{
              expanded() ? 'expanded' : 'grid-rows-[0fr]'
            }} print:grid-rows-1"
          >
            <div class="overflow-hidden print:overflow-auto">
              @if (project.attributes.tech.length) {
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                  @for (tech of project.attributes.tech; track tech.attributes.slug) {
                    <span class="text-foreground flex items-center gap-1 text-sm print:text-xs">
                      @if (tech.attributes.avatar) {
                        <img
                          class="h-4 rounded"
                          [src]="tech.attributes.avatar"
                          [alt]="tech.attributes.title"
                          [hlmTooltipTrigger]="tech.attributes.title"
                        />
                      } @else {
                        <ac-icon [icon]="helpIcon" class="h-4 rounded" />
                      }
                      {{ tech.attributes.title }}
                    </span>
                  }
                </div>
              }

              <analog-markdown
                class="prose lg:prose-lg print:prose-sm dark:prose-invert contents"
                [content]="project.content"
              />
            </div>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Project {
  public readonly project = input.required<ContentFile<ProjectAttributes>>();
  public readonly techs = input.required<ContentFile<TechAttributes>[]>();
  public readonly expanded = input.required<boolean>();

  public readonly toggleExpanded = output();

  readonly helpIcon = mdiHelp;

  readonly uiProject = computed(() => {
    const project = this.project();
    const techs = this.techs();

    const { attributes } = project;
    const { start, end } = attributes;
    const durationInMonths = end ? differenceInCalendarMonths(end, start) : 0;
    const durationInYears = end ? differenceInCalendarYears(end, start) : 0;
    return {
      ...project,
      attributes: {
        ...(attributes as ProjectAttributes),
        durationInMonths,
        durationInYears,
        tech: (attributes.tech || []).map(
          (tech) =>
            techs.find((t) => t.attributes.slug === tech) || {
              attributes: { slug: tech, title: tech, avatar: '' },
            },
        ),
      },
    };
  });
}
