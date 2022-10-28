import { Component, OnInit } from '@angular/core';
import { urlConstants } from 'src/app/core/constants/urlconstants';
import { ApiService } from 'src/app/core/service';
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
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  categories = [];

  getData() {
    let categories = {
      url: urlConstants.getTopics,
    };
    this.apiService.get(categories).subscribe((data: any) => {
      if (data && data.result) {
        this.categories = data.result;
      }
    });
  }
}
