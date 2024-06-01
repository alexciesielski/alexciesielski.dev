import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { GITHUB_PUBLIC_EVENTS_RESPONSE } from './public-events-response';

export type GithubEventType = 'IssuesEvent' | 'PullRequestEvent' | 'PushEvent' | 'CreateEvent' | 'IssueCommentEvent';

@Injectable({ providedIn: 'root' })
export class GithubEventService {
  constructor() {}

  fetchAll() {
    return of(GITHUB_PUBLIC_EVENTS_RESPONSE);
  }

  // private async fetchAll() {
  //   const octokit = new Octokit({ auth: import.meta.env['GITHUB_TOKEN'] });

  //   const response = await octokit.request('GET /users/{username}/events/public', {
  //     username: 'alexciesielski',
  //     headers: {
  //       'X-GitHub-Api-Version': '2022-11-28',
  //     },
  //   });

  //   return response.data;
  // }
}
