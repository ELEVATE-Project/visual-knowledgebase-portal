import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title='Visual Knowledge';
  authStatus:any;
  auth = 'Login'

  onloginpage= true;

  
  constructor(public router:Router) {

   }

  ngOnInit(): void {
  }

  authChange(){
    this.authStatus = !this.authStatus;
    if(this.authStatus){
      this.auth = 'Logout';
    }else{
      this.auth = 'Login'
    }
    this.onloginpage =false;
  }

}
