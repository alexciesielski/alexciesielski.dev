import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { mdiGithub } from '@mdi/js';
import { formatDistanceToNow, formatRelative } from 'date-fns';
import { NgScrollbar } from 'ngx-scrollbar';
import { map } from 'rxjs';
import { Icon } from '../../components/icon';
import { GithubEventService, GithubEventType } from '../../github/github.service';

@Component({
  selector: 'ac-github-activity',
  standalone: true,
  imports: [Icon, NgOptimizedImage, NgScrollbar, AsyncPipe],
  template: `
    <p class="z-20 p-4 pb-0 text-lg font-normal tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">Github Activity</p>
    <div class="absolute top-[50%] opacity-5 lg:-bottom-12 lg:-right-12">
      <ac-icon class="fill-secondary h-[25dvw] dark:fill-neutral-300" [icon]="mdiGithub" />
    </div>

    <ng-scrollbar class="z-10" [visibility]="'hover'">
      <div class="flex h-full w-full flex-col gap-y-2 py-2">
        @for (activity of githubActivity | async; track activity.id) {
          <a
            class="text-secondary/50 group grid grid-cols-[24px,1fr,auto] items-center gap-x-2 px-4 py-2 transition-all hover:rounded-md hover:shadow dark:text-neutral-400"
            [href]="activity.clickTarget"
            target="_blank"
          >
            @if (activity.icon) {
              <img
                class="rounded-full transition-all group-hover:scale-110"
                [ngSrc]="activity.icon"
                [alt]="activity.type"
                [width]="24"
                [height]="24"
              />
            }

            <div class="">
              <span> {{ activity.didWhat }} </span>
              <span class="text-secondary italic transition-colors group-hover:text-emerald-600 dark:text-neutral-200">
                {{ activity.didTitle }}</span
              >
              @if ($any(activity).connectingWord !== undefined) {
                <span> {{ $any(activity).connectingWord }} </span>
              } @else {
                in
              }
              <span class="text-secondary italic transition-colors group-hover:text-emerald-600 dark:text-neutral-200">
                {{ activity.didWhere }}
              </span>
            </div>
            <span class="self-start text-right text-xs"> {{ activity.timeAgo }} </span>
          </a>
        }
      </div>
    </ng-scrollbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubActivityComponent {
  readonly mdiGithub = mdiGithub;

  private readonly githubEventService = inject(GithubEventService);
  readonly githubActivity = this.githubEventService.fetchAll().pipe(
    map((events) =>
      events.map((event) => ({
        ...event,
        timeAgo: formatDistanceToNow(new Date(event.created_at!), {
          addSuffix: true,
        }),
        timeAgoRelative: formatRelative(new Date(event.created_at!), new Date()),
      })),
    ),
    map((events) =>
      events.map((event) => {
        const type = event.type as GithubEventType;
        switch (type) {
          case 'IssuesEvent':
            return {
              ...event,
              didWhat: `opened issue`,
              didWhere: event.repo.name,
              didTitle: event.payload.issue?.title,
              clickTarget: event.payload.issue?.url,
              icon: event.org?.avatar_url,
            };
          case 'PullRequestEvent':
            return {
              ...event,
              didWhat: `opened pull request`,
              didWhere: event.repo.name,
              didTitle: event.payload.pull_request?.title,
              clickTarget: event.payload.pull_request?.html_url,
              icon: event.payload.pull_request?.base?.repo?.owner?.avatar_url,
            };
          case 'PushEvent':
            return {
              ...event,
              didWhat: `pushed to`,
              didWhere: event.repo.name,
              didTitle: event.payload.commits?.[0]?.message,
              // clickTarget: event.payload.commits?.[0].,
              icon: event.actor?.avatar_url,
            };
          case 'CreateEvent':
            return {
              ...event,
              didWhat: `created ${event.payload.ref_type}`,
              didWhere: event.repo.name,
              didTitle: event.payload.ref,
              clickTarget: event.repo.url,
              icon: event.org?.avatar_url,
            };
          case 'PullRequestReviewEvent' as any:
          case 'PullRequestReviewCommentEvent' as any:
          case 'IssueCommentEvent':
            return {
              ...event,
              didWhat: `commented on issue`,
              didWhere: event.repo.name,
              didTitle: event.payload.issue?.title,
              clickTarget: event.payload.comment?.html_url,
              icon: event.org?.avatar_url,
            };
          case 'WatchEvent':
            return {
              ...event,
              didWhat: `starred`,
              didWhere: event.repo.name,
              didTitle: '',
              clickTarget: event.repo.url,
              connectingWord: '',
              icon: event.org?.avatar_url,
            };
          case 'ForkEvent':
            return {
              ...event,
              didWhat: `forked repository`,
              didWhere: event.repo.name,
              didTitle: '',
              clickTarget: event.repo.url,
              connectingWord: '',
              icon: event.org?.avatar_url,
            };
          default:
            return {
              ...event,
              didWhat: `did something`,
              didWhere: event.repo.name,
              didTitle: event.type,
              clickTarget: event.repo.url,
              icon: event.org?.avatar_url,
            };
        }
      }),
    ),

    map((events) =>
      events.filter((event) => {
        if ((event.type as GithubEventType) === 'CreateEvent') {
          if (
            event.payload.ref_type === 'branch' ||
            event.payload.ref_type === 'tag' ||
            event.payload.ref_type === 'repository'
          ) {
            return false;
          }
        } else if (event.type === 'DeleteEvent') {
          return false;
        }

        return true;
      }),
    ),
    map((events) => events.slice(0, 50)),
  );
}
