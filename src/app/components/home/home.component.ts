import { Component, OnInit } from '@angular/core';
import { ApiService, ToastService } from 'src/app/core/service';
import { urlConstants } from 'src/app/core/constants/urlconstants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {}
  categories: any;
  ngOnInit(): void {
    this.getAllCategory();
  }

  newCategory($event: any) {
    const newCategory = {
      url: urlConstants.topicCreation,
      payload: {
        topicName: $event.data.name,
        description: $event.data.description,
      },
    };
    this.apiService.post(newCategory).subscribe((data: any) => {
      this.toastService.showMessage(data.message, 'success');
      this.getAllCategory();
    });
  }
  getAllCategory() {
    let categories = {
      url: urlConstants.getTopics,
    };
    this.apiService.get(categories).subscribe((data: any) => {
      if (data && data.result) {
        this.categories = data.result;
      }
    });
  }
  deleteOneCategory($event: any) {
    const config = {
      url: urlConstants.deleteTopic + $event,
    };
    this.apiService.delete(config).subscribe((data: any) => {
      this.toastService.showMessage(data.message, 'success');
      this.getAllCategory();
    });
  }
}
