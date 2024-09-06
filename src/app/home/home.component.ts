import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  safeTypesList = [{1 : 'Black'}, {2 : 'Blue'}, {3 : 'Brown'}, {4 : 'Cherry Red'}, {5 : 'Cream'}, {6 : 'Frozen Blue'}, {7 : 'Grey'}, {8 : 'Havanna Brown'}, {9 : 'Honey Yellow'}, {10 : 'Jungle Green'}, {11 : 'Lagoon Blue'}, {12 : 'Lava Orange'}, {13 : 'Lemon Yellow'}, {14 : 'Lizzard Green'}, {15 : 'Maple Green'}, {16 : 'Mint Ice'}, {17 : 'Ocean Blue'}, {18 : 'Pebble Grey'}, {19 : 'White'}];
  safeFurnitureList = [{1 : 'Bronze'}, {2 : 'Classic'}, {3 : 'Gold'}, {4 : 'Graphite'}, {5 : 'Grey'}];

  safeTypeOptions : string[];
  safeFurnitureOptions : string[];

  selectedSafeTypeOption : string;
  selectedSafeFurnitureOptions : string;
  selectedSafeOutlineOption : string;

  constructor(private titleService:Title) {
    this.titleService.setTitle("Configurator");

    // сам корпус сейфа
    this.safeTypeOptions = this.safeTypesList.map(option => Object.values(option)[0]);
    this.selectedSafeTypeOption = this.safeTypeOptions[0];

    // металлические детали
    this.safeFurnitureOptions = this.safeFurnitureList.map(option => Object.values(option)[0]);
    this.selectedSafeFurnitureOptions = this.safeFurnitureOptions[0];

    // окантовка
    this.selectedSafeOutlineOption = this.safeTypeOptions[0];
  }

  ngOnInit(): void {}

  onChangeSafeType(selection : string) {
    this.selectedSafeTypeOption = selection;

    this.safeTypeOptions = this.safeTypesList.map(option => Object.values(option)[0]);
  }

  onChangeSafeFurniture(selection : string) {
    this.selectedSafeFurnitureOptions = selection;

    this.safeFurnitureOptions = this.safeFurnitureOptions = this.safeFurnitureList.map(option => Object.values(option)[0]);
  }

  onChangeSafeOutline(selection : string) {
    this.selectedSafeOutlineOption = selection;

    this.safeTypeOptions = this.safeTypesList.map(option => Object.values(option)[0]);
  }
}
