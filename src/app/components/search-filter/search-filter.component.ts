import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../service/apiservice.service';
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
  constructor(private apiService: ApiserviceService) {}

  ngOnInit(): void {
    this.getData();
  }

  categories = [];

  getData() {
    this.apiService.getData().subscribe((res: any) => {
      this.categories = res;
    });
  }
}
