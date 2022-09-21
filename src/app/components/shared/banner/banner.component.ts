import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  bannerCaption = 'Hey there, how can we help you?'
  constructor() { }

  ngOnInit(): void {
  }

}
