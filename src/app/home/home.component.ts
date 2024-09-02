import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  safeTypesList = ['', '1', '2', '3'];
  safeStylesList = ['', 'Option A', 'Option B', 'Option C'];

  safeType : string;
  safeStyle : string;

  constructor(private titleService:Title) {
    this.titleService.setTitle("Configurator");
    this.safeType = this.safeTypesList[0];
    this.safeStyle = this.safeStylesList[0]
  }

  ngOnInit(): void {}

}
