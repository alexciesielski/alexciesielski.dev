import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Icon } from '../../components/icon';
import { Tile } from '../../components/tile';
import { injectBlogPostAttributes } from '../../util/inject-blog-post-attributes';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, Tile, NgScrollbar, Icon, DatePipe, NgOptimizedImage],
  templateUrl: './(blog).page.html',
  host: {
    class: 'block h-full',
  },
})
export default class BlogComponent {
  readonly posts = injectBlogPostAttributes();
  readonly latestPost = this.posts[0]!;
  readonly latestPosts = this.posts.slice(1, 4);
}
