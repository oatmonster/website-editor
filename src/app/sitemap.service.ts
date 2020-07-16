import { Injectable } from '@angular/core';
import { ApiService, IBlogPost } from './api.service';
import { first } from 'rxjs/operators'

@Injectable( {
  providedIn: 'root',
} )
export class SitemapService {

  constructor( private apiService: ApiService ) { }

  public async getSitemap(): Promise<string> {
    let blogPageSize = 10;
    let blogPageCount: number;
    let blogPosts: Array<IBlogPost>;

    let res = await this.apiService.getBlogPosts().pipe( first() ).toPromise();

    blogPageCount = Math.ceil( res.count / blogPageSize );

    // Get array of public blog post
    blogPosts = res.posts.filter( post => {
      return post.public !== false;
    } );

    // Get the posts from the latter pages
    let promises = [];

    for ( let i = 2; i <= blogPageCount; i++ ) {
      promises.push( this.apiService.getBlogPosts( { page: i } ).pipe( first() ).toPromise() );
    }

    await Promise.all( promises ).then( ( values ) => {
      values.map( res => {
        blogPosts = blogPosts.concat( res.posts.filter( post => {
          return post.public !== false;
        } ) );
      } );
    } );

    // Generate the sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
    sitemap += '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog</loc>\n\t\t<changefreq>daily</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/projects</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/about</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';

    blogPosts.forEach( post => {

      post.subtitle = post.subtitle.replace( /'/g, '&apos;' );
      post.subtitle = post.subtitle.replace( /"/g, '&quot;' );

      sitemap += `\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog/${post.id}</loc>\n\t\t<changefreq>weekly</changefreq>`;

      // Thumbnail
      sitemap += '\n\t\t<image:image>'
      sitemap += `\n\t\t\t<image:loc>https://www.alexzhao.me/blog/${post.id}/thumbnail_1920w.jpg</image:loc>`;
      sitemap += `\n\t\t\t<image:title>${post.title} | Alex Zhao</image:title>`;
      sitemap += `\n\t\t\t<image:caption>${post.subtitle || ''}</image:caption>`;
      sitemap += '\n\t\t</image:image>'


      // Get images from content
      let regex = /!\[(.*)]\((\w*\.*\w*)(?:\ "(.*)")?\)/g;
      let images = [ ...post.content.matchAll( regex ) ];

      images.forEach( image => {
        image.forEach( ( e, i, a ) => {
          a[ i ] = a[ i ].replace( /'/g, '&apos;' );
          a[ i ] = a[ i ].replace( /"/g, '&quot;' );
        } );
        sitemap += '\n\t\t<image:image>'
        sitemap += `\n\t\t\t<image:loc>https://www.alexzhao.me/images/blog/${image[ 2 ]}</image:loc>`;
        sitemap += `\n\t\t\t<image:title>${image[ 3 ] || ''} | Alex Zhao</image:title>`;
        sitemap += `\n\t\t\t<image:caption>${image[ 2 ] || ''}</image:caption>`;
        sitemap += '\n\t\t</image:image>'
      } );

      sitemap += '\n\t</url>';
    } );

    // Add extra blog pages
    let publicPageCount = Math.ceil( blogPosts.length / blogPageSize )
    for ( let i = 2; i <= publicPageCount; i++ ) {
      sitemap += `\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog?page=${i}</loc>\n\t\t<changefreq>weekly</changefreq>\n\t</url>`;
    }

    sitemap += '\n</urlset>';

    return sitemap;
  }

}