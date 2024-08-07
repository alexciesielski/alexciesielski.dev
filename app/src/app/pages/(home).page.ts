import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import LandingComponent from './(landing)/landing.component';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'author',
      content: 'Alexander Ciesielski',
    },
    {
      property: 'og:title',
      content: 'Alexander Ciesielski (.dev)',
    },
    {
      property: 'og:description',
      content: 'Alexander Ciesielski is a software engineer specialized in frontend development.',
    },
    {
      property: 'og:image',
      content: '/profile.jpg',
    },
  ],
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, RouterLink],
  template: ` <ac-landing /> `,
})
export default class HomeComponent {}
