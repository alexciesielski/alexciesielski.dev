import { MarkdownComponent } from '@analogjs/content';
import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { Tile } from '../../components/tile';
import { injectBlogPostAttributes } from '../../util/inject-blog-post-attributes';
import { AboutMeComponent } from './about-me.component';
import { AvailabilityComponent } from './availability.component';
import { FindMeComponent } from './find-me.component';
import { GithubActivityComponent } from './github-activity.component';
import { ProjectsComponent } from './projects.component';

@Component({
  selector: 'ac-landing',
  standalone: true,
  imports: [
    RouterLink,
    Tile,
    AboutMeComponent,
    AvailabilityComponent,
    FindMeComponent,
    GithubActivityComponent,
    ProjectsComponent,
    SlicePipe,
    MarkdownComponent,
  ],
  templateUrl: './landing.component.html',
  host: {
    class: 'h-full w-full grid gap-4',
  },
  styleUrl: './landing.component.css',
})
export default class LandingComponent {
  readonly posts = injectBlogPostAttributes()
    .sort((a, b) => new Date(b.attributes.date).valueOf() - new Date(a.attributes.date).valueOf())
    .map((post) => ({
      ...post,
      attributes: {
        ...post.attributes,
        dateRelative: formatDistanceToNow(new Date(post.attributes.date), { addSuffix: true }),
      },
    }));
}
