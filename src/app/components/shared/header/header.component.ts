import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  title = 'Visual Knowledge';
  authStatus: any;
  auth = 'Login';
  subscriptions;
  onloginpage = true;

  constructor(public router: Router, public userService: CurrentUserService) {
  this.subscriptions =  userService.eventEmit.subscribe(data =>{
     this.getUser();
   })
  }

  ngOnInit(): void {
    this.getUser();
  }

  authChange() {
    this.onloginpage = false;
    if(this.auth == 'Logout'){
      this.logout();
    }
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
  logout(){
    this.auth = 'Login';
    this.userService.deleteUser().then(data =>{
    })
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
