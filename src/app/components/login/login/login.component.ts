import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { urlConstants } from 'src/app/core/constants/urlconstants';
import { ApiService, CurrentUserService, ToastService } from 'src/app/core/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
//  public loginForm: FormGroup;
  inboundClick = true;
  outboundClick = true;
  onloginpage = true;
  hide = true;
  topics =[];
  loginForm = this.formBuilder.group({
    email:[''],
    password:['']
  })
  
  
  constructor(
    private apiService : ApiService,
    private toastService : ToastService,
    private userService : CurrentUserService,
    private router : Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  }
  
  onlogin(){
    const config ={
      url : urlConstants.login,
       payload:{
       "email":this.loginForm.value.email,
       "password":this.loginForm.value.password

     }
  }
    this.apiService.post(config).subscribe(data =>{  
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

