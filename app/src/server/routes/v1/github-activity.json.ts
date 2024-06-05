import { Octokit } from '@octokit/core';
import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/json');

  const meta = import.meta;
  const githubToken = meta.env?.['GITHUB_TOKEN'];

  const octokit = new Octokit({ auth: githubToken });

  const response = await octokit.request('GET /users/{username}/events/public', {
    username: 'alexciesielski',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const events = response.data;
  return events;
});
