import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class GithubService {


  constructor(private HttpClient: HttpClient) {
    console.log('Github service started ...');
  }

  getByKeyword(keyword) {
    return this.HttpClient.get('https://api.github.com/search/repositories?q=' + keyword + ':mozilla&per_page=30&page=1');
  }

  getByPageNumber(keyword, page) {
    return this.HttpClient.get('https://api.github.com/search/repositories?q=' + keyword + ':mozilla&per_page=30&page=' + page);
  }

 getPreviousPage(keyword, currentPage) {
   currentPage = currentPage - 1;
   return this.HttpClient.get('https://api.github.com/search/repositories?q=' + keyword + ':mozilla&per_page=30&page=' + currentPage);
 }

 getNextPage(keyword, currentPage) {
  currentPage = currentPage + 1;
  return this.HttpClient.get('https://api.github.com/search/repositories?q=' + keyword + ':mozilla&per_page=30&page=' + currentPage);
}

}
