import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../service/apiservice.service';
import { ApiService, ToastService } from 'src/app/core/service';
import { urlConstants } from 'src/app/core/constants/urlconstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private apiService: ApiserviceService,
    private toastService: ToastService,
    private apiService1: ApiService
  ) {}
  categories: any;
  ngOnInit(): void {
    this.getAllCategory();
  }

  newCategory($event: any) {
    let createCategory = {
      url: urlConstants.createTopic,
      payload: {
        topicName: $event.data.name,
        description: $event.data.description,
      },
    };
    this.apiService1.post(createCategory).subscribe((data) => {
      this.toastService.showMessage(data.message, 'success');
      this.getAllCategory();
    });
  }

  getAllCategory() {
    let categories = {
      url: urlConstants.getTopics,
    };
    this.apiService1.get(categories).subscribe((data) => {
      console.log(data);
      if (data && data.result) {
        this.categories = data.result;
      } else {
        this.toastService.showMessage(
          data.message,
          'no data available to display'
        );
      }
    });
  }
}
