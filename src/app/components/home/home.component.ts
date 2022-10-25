import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../service/apiservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private apiService: ApiserviceService
  ) {}
  categories: any;
  ngOnInit(): void {
    this.getAllCategory();
  }

  newCategory($event: any) {
    console.log('new cat', $event);
    this.categories.push($event.data);
    this.http
      .post('http://34.126.99.183/knowledgebase/v1/topics/create', {
        topicName: $event.data.name,
        description: $event.data.description,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  getAllCategory() {
    this.apiService
      .getAllCategory()
      .subscribe((data) => (this.categories = data.result));
  }
}
