import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { GITHUB_PUBLIC_EVENTS_RESPONSE } from './public-events-response';

export const STORAGE = new InjectionToken<Storage | null>('Storage', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return localStorage;
    }
    return null;
  },
});

type GithubEventResponse = typeof GITHUB_PUBLIC_EVENTS_RESPONSE;

export type GithubEventType =
  | 'IssuesEvent'
  | 'PullRequestEvent'
  | 'PushEvent'
  | 'CreateEvent'
  | 'IssueCommentEvent'
  | 'WatchEvent'
  | 'ForkEvent';

@Injectable({ providedIn: 'root' })
export class GithubEventService {
  constructor(private readonly http: HttpClient) {}

  private readonly storage = inject(STORAGE);

  private readonly lastFetched = this.storage?.getItem('github-last-fetched');
  private readonly cachedEvents = this.storage?.getItem('github-events');

  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loading$$.asObservable();

  fetchAll(): Observable<GithubEventResponse> {
    if (this.lastFetched && this.cachedEvents && Date.now() - Number(this.lastFetched) < 1000 * 60 * 5) {
      return of(JSON.parse(this.cachedEvents));
    }

    this.loading$$.next(true);
    return this.http.get<GithubEventResponse>('api/v1/github-activity').pipe(
      tap((events) => {
        this.storage?.setItem('github-last-fetched', String(Date.now()));
        this.storage?.setItem('github-events', JSON.stringify(events));
      }),
      finalize(() => this.loading$$.next(false)),
      catchError(() => of([])),
    );
  }
}
