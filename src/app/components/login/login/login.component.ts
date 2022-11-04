import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { urlConstants } from 'src/app/core/constants/urlconstants';
import { ApiService, CurrentUserService, ToastService } from 'src/app/core/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inboundClick = true;
  outboundClick = true;
  onloginpage = true;
  hide = true;
  topics =[];
  constructor(
    private apiService : ApiService,
    private toastService : ToastService,
    private userService : CurrentUserService,
    private router : Router
  ) {}

  ngOnInit(): void {}
  
  onlogin(form:any){
    const config ={
      url : urlConstants.login,
        payload:{
        "email":"system@admin.com",
        "password":"testing"
      }
  }
    this.apiService.post(config).subscribe(data =>{
      // console.log(data,"data");
      if(data && data.result){
        this.userService.setUser(data.result).then(() =>{
          this.router.navigate(['/']);
        })
         this.toastService.showMessage(data.message,'success');
      }
    },error =>{
    })
  }
}

