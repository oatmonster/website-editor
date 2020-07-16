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
    let blogPosts: Array<string>;

    let res = await this.apiService.getBlogPosts().pipe( first() ).toPromise();

    blogPageCount = Math.ceil( res.count / blogPageSize );

    // Get array of public blog post IDs
    blogPosts = res.posts.filter( post => {
      return post.public !== false;
    } ).map( post => { return post.id } );

    // Get the posts from the latter pages
    let promises = [];

    for ( let i = 2; i <= blogPageCount; i++ ) {
      promises.push( this.apiService.getBlogPosts( { page: i } ).pipe( first() ).toPromise() );
    }

    await Promise.all( promises ).then( ( values ) => {
      values.map( res => {
        blogPosts = blogPosts.concat( res.posts.filter( post => {
          return post.public !== false;
        } ).map( post => { return post.id } ) );
      } );
    } );

    // Generate the sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog</loc>\n\t\t<changefreq>daily</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/projects</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';
    sitemap += '\n\t<url>\n\t\t<loc>https://www.alexzhao.me/about</loc>\n\t\t<changefreq>monthly</changefreq>\n\t</url>';

    blogPosts.forEach( post => {
      sitemap += `\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog/${post}</loc>\n\t\t<changefreq>weekly</changefreq>\n\t</url>`;
    } );

    // Add extra blog pages
    let publicPageCount = Math.ceil( blogPosts.length / blogPageSize )
    for ( let i = 2; i <= publicPageCount; i++ ) {
      sitemap += `\n\t<url>\n\t\t<loc>https://www.alexzhao.me/blog?page=${i}</loc>\n\t\t<changefreq>weekly</changefreq>\n\t</url>`;
    }

    sitemap += '\n</urlset>';
    console.log( blogPosts );

    return sitemap;
  }

}