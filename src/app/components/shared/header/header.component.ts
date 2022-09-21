import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title='Visual Knowledge';
  authStatus:any;
  auth = 'Login'
  constructor() { }

  ngOnInit(): void {
  }

  authChange(){
    this.authStatus = !this.authStatus;
    if(this.authStatus){
      this.auth = 'Logout';
    }else{
      this.auth = 'Login'
    }
  }

}
