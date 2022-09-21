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
      title: 'About us',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'person',
      title: 'Account',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'admin_panel_settings',
      title: 'Administration',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'analytics',
      title: 'Analytics',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'forum',
      title: 'Community',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'engineering',
      title: 'Engineering',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'help',
      title: 'Support',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'shopping_cart',
      title: 'Products',
      description: 'This is a sample description of the card contanining two lines of description',
    },{
      icon:'emoji_objects',
      title: 'Solution',
      description: 'This is a sample description of the card contanining two lines of description',
    },
    {
      icon:'calendar_month',
      title: 'Events',
      description: 'This is a sample description of the card contanining two lines of description',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
