import { Component, OnInit } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/urlconstants';
import { ApiService } from 'src/app/core/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  data = { name: '', content: '' };
  searchText: string = '';
  searchText1: string = '';
  categories: any = [];
  viewNumber = false;

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  redirectToBlog(selectedTopicName: any, selectedTopicId: any) {
    this.router.navigate(['/blog'], {
      queryParams: { TopicId: selectedTopicId, TopicName: selectedTopicName },
    });
  }
  getData() {
    let category = {
      url: this.searchText
        ? urlConstants.searchFilter + this.searchText
        : urlConstants.getTopics,
    };
    this.searchText1 = this.searchText;
    this.apiService.get(category).subscribe((data: any) => {
      this.categories = this.searchText ? data.result.topics : data.result;
    });
  }
  searchData() {
    this.viewNumber = true;
    this.getData();
  }
}
