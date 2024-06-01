import { injectContentFiles } from '@analogjs/content';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Icon } from '../../components/icon';
import { Tile } from '../../components/tile';
import { PostAttributes } from '../../post-attributes';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, Tile, NgScrollbar, Icon],
  templateUrl: './(blog).page.html',
  host: {
    class: 'h-full grid grid-cols-1 gap-4 list-none lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4',
  },
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
