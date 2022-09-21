import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() cardDetail:any;
@Input() last:any;
isAdmin = localStorage.getItem('auth')

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  redirectToBlog(){
    this.router.navigate(['/blog'])
  }
}
