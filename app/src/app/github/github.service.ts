import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

export type GithubEventType =
  | 'IssuesEvent'
  | 'PullRequestEvent'
  | 'PushEvent'
  | 'CreateEvent'
  | 'IssueCommentEvent'
  | 'WatchEvent';

@Injectable({ providedIn: 'root' })
export class GithubEventService {
  constructor(private readonly http: HttpClient) {}

  private readonly lastFetched = localStorage.getItem('github-last-fetched');
  private readonly cachedEvents = localStorage.getItem('github-events');

  fetchAll() {
    if (this.lastFetched && this.cachedEvents && Date.now() - Number(this.lastFetched) < 1000 * 60 * 5) {
      return of(JSON.parse(this.cachedEvents));
    }

    return this.http.get('/api/v1/github-activity.json').pipe(
      tap((events) => {
        localStorage.setItem('github-last-fetched', String(Date.now()));
        localStorage.setItem('github-events', JSON.stringify(events));
      }),
    );
  }
}
