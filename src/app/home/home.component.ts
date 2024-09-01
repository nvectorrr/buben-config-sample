import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFirst : boolean = true;
  showSecond : boolean = false;

  constructor(private titleService:Title) {
    this.titleService.setTitle("Мотивашка чеспека");
  
  }

  setFirst() {

    console.log("suka");

    this.showFirst = true;
    this.showSecond = false;
  }

  setSecond() {

    console.log("pizda");

    this.showFirst = false;
    this.showSecond = true;
  }

  ngOnInit(): void {}

}
