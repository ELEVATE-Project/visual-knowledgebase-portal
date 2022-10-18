import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

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

   loginForm: FormGroup | undefined;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
   );
  }
  onlogin(form: NgForm){
      console.log(form);
    
  }

}

