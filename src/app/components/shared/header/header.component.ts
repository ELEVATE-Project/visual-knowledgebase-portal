import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = 'Visual Knowledge';
  authStatus: any;
  auth = 'Login';

  onloginpage = true;

  constructor(public router: Router, public userService: CurrentUserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  authChange() {
    this.onloginpage = false;
  }
  getUser() {
    this.userService.getUser().then((data) => {
      if (data) {
        this.auth = 'Logout';
      } else {
        this.auth = 'Login';
      }
    });
  }
}
