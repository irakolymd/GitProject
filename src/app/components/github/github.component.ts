import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {


  allRepositories: any;
  filteredRepositories: any;
  keyword: string;
  loading: boolean;
  noResults: boolean;
  totalCount = 0;
  pages = 0;
  numberOfPages: number;
  arrayPages = [];
  currentPage = 1;

  constructor(private githubService: GithubService) { }

  ngOnInit() { }

   getByKeyword() {
    this.loading = true;
    if (this.keyword !== '' && this.keyword != null) {
      this.githubService.getByKeyword(this.keyword).subscribe(repositories => {
        this.filteredRepositories = repositories;
        this.fillWithData();
        if (this.filteredRepositories.total_count === 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      });
    }
  }

  createPagesArray(pages: number) {
    this.arrayPages.length = 0;
    if (pages > 10) {
      for (let i = this.currentPage - 1; i < this.currentPage + 10; i++) {
        let temp = this.currentPage;
        for (let j = 0; j < 10; j++) {
          {
            this.arrayPages[j] = temp;
            temp++;
          }
        }
      }
      this.arrayPages[10] = '...';
      this.arrayPages[11] = this.pages;
    } else {
      for (let i = 0; i < pages; i++) {
        this.arrayPages[i] = i + 1;
      }
    }
  }

  getRepoByPage(page: number) {
    if (typeof (page) === 'number') {
      this.githubService.getByPageNumber(this.keyword, page).subscribe(repositories => {
        this.filteredRepositories = [];
        this.filteredRepositories = repositories;
        this.currentPage = page;
        this.fillWithData();
      });
    }
  }

  getPreviousPage() {
    this.githubService.getPreviousPage(this.keyword, this.currentPage).subscribe(repositories => {
      this.filteredRepositories = [];
      this.filteredRepositories = repositories;
      this.fillWithData();
      this.currentPage--;
    });
  }

  getNextPage() {
      this.githubService.getNextPage(this.keyword, this.currentPage).subscribe(repositories => {
        this.filteredRepositories = [];
        this.filteredRepositories = repositories;
        this.fillWithData();
        this.currentPage ++;
      });
  }

  fillWithData() {
    this.loading = false;
    this.totalCount = this.filteredRepositories.total_count;
    this.numberOfPages = this.totalCount / 30;
    if (this.totalCount % 30 === 0) {
      this.pages = Math.trunc(this.numberOfPages);
      this.numberOfPages = this.pages;
    } else {
      this.pages = Math.ceil(this.numberOfPages);
      this.numberOfPages = this.pages;
    }
    this.createPagesArray(this.pages);
  }
}
