import { ContentFile, injectContent, injectContentFiles, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { mdiEmail, mdiOpenInNew } from '@mdi/js';
import { compareAsc } from 'date-fns';
import { debounceTime, take, tap } from 'rxjs';
import { Icon } from '../../components/icon';
import { Tooltip } from '../../components/tooltip';
import { HlmInputDirective } from '../../components/ui-input-helm/hlm-input.directive';
import { ProjectAttributes, TechAttributes } from '../../project-attributes';
import { injectProjectAttributes } from '../../util/inject-project-attributes';
import { Project } from './project';
import { CVSection } from './section';

export const routeMeta: RouteMeta = {
  title: 'CV | Alexander Ciesielski',
  meta: [
    {
      name: 'author',
      content: 'Alexander Ciesielski',
    },
    {
      property: 'og:title',
      content: "Alexander Ciesielski's CV",
    },
    // {
    //   property: 'og:description',
    //   content: 'Some catchy description',
    // },
    // {
    //   name: 'description',
    //   content: "Alexander Ciesielski's CV",
    // },
    {
      property: 'og:image',
      content: '/profile.jpg',
    },
  ],
};

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    Icon,
    NgOptimizedImage,
    JsonPipe,
    MarkdownComponent,
    Tooltip,
    CVSection,
    Project,
    HlmInputDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './(cv).page.html',
  host: {
    class: 'block h-full break-inside-auto',
  },
  styles: `
    main,
    section {
      break-inside: always;
    }
  `,
})
export default class CVComponent {
  constructor() {
    injectProjectAttributes()
      .map((project) => `projects/${project.attributes.slug}`)
      .map((projectSlug) =>
        injectContent<ProjectAttributes>({
          customFilename: projectSlug,
        })
          .pipe(
            tap((project) => this._projects.update((projects) => ({ ...(projects || {}), [projectSlug]: project }))),
            take(1),
          )
          .subscribe(),
      );

    injectContentFiles<TechAttributes>((file) => file.filename.startsWith('/src/content/tech'))
      .map((tech) => `tech/${tech.attributes.slug}`)
      .map((techSlug) =>
        injectContent<TechAttributes>({
          customFilename: techSlug,
        })
          .pipe(
            tap((tech) => this._techs.update((techs) => ({ ...(techs || {}), [techSlug]: tech }))),
            take(1),
          )
          .subscribe(),
      );

    injectContent({
      customFilename: 'about',
    })
      .pipe(
        tap((aboutMe) => this.aboutMe.set(typeof aboutMe.content === 'string' ? aboutMe.content : '')),
        take(1),
      )
      .subscribe();

    injectContent({
      customFilename: 'highlights',
    })
      .pipe(
        tap((highlights) => this.highlights.set(typeof highlights.content === 'string' ? highlights.content : '')),
        take(1),
      )
      .subscribe();
  }

  readonly aboutMe = signal<string>('');
  readonly highlights = signal<string>('');

  private readonly _techs = signal<
    Record<string, ContentFile<{ slug: string; title: string; avatar: string } | Record<string, never>>> | undefined
  >(undefined);

  readonly techs = computed(() =>
    Object.values(this._techs() || {}).map((tech) => {
      const { attributes } = tech;
      return {
        ...tech,
        attributes: { ...(attributes as TechAttributes) },
      };
    }),
  );

  private readonly _projects = signal<
    Record<string, ContentFile<ProjectAttributes | Record<string, never>>> | undefined
  >(undefined);

  readonly projects = computed(() =>
    Object.values(this._projects() || {})
      .filter((project) => project.attributes.visible !== false)
      .sort((a, b) => compareAsc(new Date(b.attributes.start), new Date(a.attributes.start))),
  );

  private readonly expandedProjects = signal<Record<string, boolean>>({});

  readonly searchCtrl = new FormControl('', { nonNullable: true });
  private readonly searchValue = toSignal(this.searchCtrl.valueChanges.pipe(debounceTime(100)), {
    initialValue: '',
  });

  readonly startDateCtrl = new FormControl<Date | null>(null);
  private readonly startDateValue = toSignal(this.startDateCtrl.valueChanges.pipe(debounceTime(100)));

  readonly uiProjects = computed(() => {
    const projects = this.projects();
    const expandedProjects = this.expandedProjects();
    const searchValue = this.searchValue();
    const startDateValue = this.startDateValue();

    return projects
      .map((project) => ({
        ...(project as ContentFile<ProjectAttributes>),
        expanded: expandedProjects[project.attributes.slug],
      }))
      .filter((project) => {
        if (searchValue === '') {
          return true;
        }

        const keys: (keyof ProjectAttributes)[] = ['title', 'description', 'tech', 'org'];
        const passes = keys.some((key) => {
          const value = project.attributes[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          }

          if (Array.isArray(value)) {
            return value.some((v) => v.toLowerCase().includes(searchValue.toLowerCase()));
          }

          return false;
        });

        if (passes) {
          return true;
        }

        const content = typeof project.content === 'string' ? project.content : '';
        return content.toLowerCase().includes(searchValue.toLowerCase());
      })
      .filter((project) => {
        if (!startDateValue) {
          return true;
        }

        const startDate = project.attributes.start;
        return compareAsc(startDate, startDateValue) >= 0;
      });
  });

  readonly mdiOpenInNew = mdiOpenInNew;
  readonly languages = [
    {
      name: 'German',
      skill: 'Native',
      icon: '🇩🇪',
    },
    {
      name: 'Polish',
      skill: 'Native',
      icon: '🇵🇱',
    },
    {
      name: 'English',
      skill: 'C2 (full proficiency)',
      icon: '🇬🇧',
    },
  ];

  readonly email = (() => {
    const emailSignal = signal<string>('');
    setTimeout(() => {
      const first = 'recruit';
      const second = 'alexciesielski';
      const third = 'dev';
      emailSignal.set(`${first}@${second}.${third}`);
    }, 100);
    return emailSignal;
  })();

  readonly emailIcon = mdiEmail;

  toggleProjectExpanded(slug: string) {
    this.expandedProjects.update((expandedProjects) => ({
      ...expandedProjects,
      [slug]: !expandedProjects[slug],
    }));
  }
}
