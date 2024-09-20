// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Списки опций
  safeTypesList: string[] = [
    'Black', 'Blue', 'Brown', 'Cherry Red', 'Cream', 'Frozen Blue',
    'Grey', 'Havanna Brown', 'Honey Yellow', 'Jungle Green', 'Lagoon Blue',
    'Lava Orange', 'Lemon Yellow', 'Lizzard Green', 'Maple Green', 'Mint Ice',
    'Ocean Blue', 'Pebble Grey', 'White'
  ];

  safeFurnitureList: string[] = [
    'Bronze', 'Classic', 'Gold', 'Graphite', 'Grey'
  ];

  safeThreadsList: string[] = [
    'Black', 'Brown', 'Red', 'White'
  ];

  // Опции для шаблона
  safeTypeOptions: string[];
  safeFurnitureOptions: string[];
  safeThreadsOptions: string[];

  // Выбранные опции
  selectedSafeTypeOption?: string;
  selectedSafeFurnitureOptions?: string;
  selectedSafeOutlineOption?: string;
  selectedSafeVerticalThreadOption?: string;
  selectedSafeHorizontalThreadOption?: string;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Конфигуратор Сейфа");

    // Инициализация опций
    this.safeTypeOptions = [...this.safeTypesList];
    this.selectedSafeTypeOption = 'Black'; // Установите значение по умолчанию

    this.safeFurnitureOptions = [...this.safeFurnitureList];
    this.selectedSafeFurnitureOptions = 'Bronze'; // Установите значение по умолчанию

    this.selectedSafeOutlineOption = 'Black'; // Установите значение по умолчанию

    this.safeThreadsOptions = [...this.safeThreadsList];
    this.selectedSafeVerticalThreadOption = 'Black'; // Установите значение по умолчанию
    this.selectedSafeHorizontalThreadOption = 'Black'; // Установите значение по умолчанию
  }

  ngOnInit(): void {}

  // Обработчики изменений
  onChangeSafeType(selection: MatSelectChange) {
    this.selectedSafeTypeOption = selection.value;
  }

  onChangeSafeFurniture(selection: MatSelectChange) {
    this.selectedSafeFurnitureOptions = selection.value;
  }

  onChangeSafeOutline(selection: MatSelectChange) {
    this.selectedSafeOutlineOption = selection.value;
  }

  onChangeSafeVerticalOutline(selection: MatSelectChange) {
    this.selectedSafeVerticalThreadOption = selection.value;
  }

  onChangeSafeHorizontalOutline(selection: MatSelectChange) {
    this.selectedSafeHorizontalThreadOption = selection.value;
  }
}
