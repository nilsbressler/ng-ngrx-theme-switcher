import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss',
})
export class BlogPostsComponent {
  posts = [
    {
      title: 'The Future of Artificial Intelligence',
      content:
        'Discover what lies ahead in the ever-evolving world of AI and its impact on technology and society.',
    },
    {
      title: 'Mastering Productivity: Tips for Success',
      content:
        'Boost your productivity with these essential strategies and tools for achieving your goals efficiently.',
    },
    {
      title: 'Exploring the World of Quantum Computing',
      content:
        'Dive into the fascinating realm of quantum computing and its potential to revolutionize data processing.',
    },
  ];
}
