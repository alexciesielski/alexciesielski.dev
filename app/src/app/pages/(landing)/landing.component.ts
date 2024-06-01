import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tile } from '../../components/tile';
import { AboutMeComponent } from './about-me.component';
import { AvailabilityComponent } from './availability.component';
import { FindMeComponent } from './find-me.component';
import { GithubActivityComponent } from './github-activity.component';

@Component({
  selector: 'ac-landing',
  standalone: true,
  imports: [RouterLink, Tile, AboutMeComponent, AvailabilityComponent, FindMeComponent, GithubActivityComponent],
  templateUrl: './landing.component.html',
  host: {
    class: 'h-full grid grid-cols-1 gap-4 list-none lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4',
  },
})
export default class LandingComponent {
  // readonly posts = injectContentFiles<PostAttributes>();
}
