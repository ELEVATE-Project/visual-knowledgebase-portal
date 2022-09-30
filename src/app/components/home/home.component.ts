import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  categories = [

    { 
      icon:'group',
      name: 'About us',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      name: 'Account',
      description: 'This is a sample description of the card contanining two lines of description',
      icon: 'person',
      blog: '',
      children: [
        {
          name: 'Login',
          children: [
            {
              parent: 'Login',
              name: 'Forgot password',
            },
            {
              name: 'Two-factor authentication',
            },
          ],
        },
        { name: 'Profile' },
      ],
    },
    {
      icon:'admin_panel_settings',
      name: 'Administration',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'analytics',
      name: 'Analytics',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'forum',
      name: 'Community',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'engineering',
      name: 'Engineering',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'help',
      name: 'Support',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'shopping_cart',
      name: 'Products',
      description: 'This is a sample description of the card contanining two lines of description',
    },{
      icon:'emoji_objects',
      name: 'Solution',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'calendar_month',
      name: 'Events',
      description: 'This is a sample description of the card contanining two lines of description',
    },
  ];
  constructor() {}

  ngOnInit(): void {}


newCategory($event: any){
  console.log('new cat',$event)
  this.categories.push($event.data)
}
}

