// home.component.ts

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SAFE_TYPES, SAFE_FURNITURES, SAFE_THREADS, SafeOption } from './safe-config.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // Константы опций
  safeTypes: SafeOption[] = SAFE_TYPES;
  safeFurnitures: SafeOption[] = SAFE_FURNITURES;
  safeThreads: SafeOption[] = SAFE_THREADS;

  // Reactive Form
  safeForm: FormGroup;

  // Карта для путей к изображениям
  imagePaths: { [key: string]: string } = {
    base: '',
    furniture: '',
    outline: '',
    threadVertical: '',
    threadHorizontal: '',
  };

  // Маппинги для изображений
  private baseImageMap: { [key: string]: string } = {};
  private furnitureImageMap: { [key: string]: string } = {};
  private outlineImageMap: { [key: string]: string } = {};
  private threadVerticalImageMap: { [key: string]: string } = {};
  private threadHorizontalImageMap: { [key: string]: string } = {};

  constructor(
    private titleService: Title,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle("Конфигуратор Сейфа");

    // Инициализация маппингов (можно вынести в константы при необходимости)
    this.safeTypes.forEach((option, index) => {
      this.baseImageMap[option.value] = `../../assets/img/closed_safe_type/1/base-${index + 1}.png`;
      this.outlineImageMap[option.value] = `../../assets/img/closed_safe_type/3/outline-${index + 1}.png`;
    });

    this.safeFurnitures.forEach((option, index) => {
      this.furnitureImageMap[option.value] = `../../assets/img/closed_safe_type/2/furnite-${index + 1}.png`;
    });

    this.safeThreads.forEach((option, index) => {
      this.threadVerticalImageMap[option.value] = `../../assets/img/closed_safe_type/4/thread-vertical-${index + 1}.png`;
      this.threadHorizontalImageMap[option.value] = `../../assets/img/closed_safe_type/5/thread-horizontal-${index + 1}.png`;
    });

    // Инициализация формы
    this.safeForm = this.fb.group({
      safeType: ['Black'],
      safeFurniture: ['Bronze'],
      safeOutline: ['Black'],
      threadVertical: ['Black'],
      threadHorizontal: ['Black'],
    });
  }

  ngOnInit(): void {
    this.updateImagePaths();

    // Подписка на изменения формы
    this.safeForm.valueChanges.subscribe(() => {
      this.updateImagePaths();
    });
  }

  // Метод для обновления путей к изображениям
  private updateImagePaths(): void {
    const { safeType, safeFurniture, safeOutline, threadVertical, threadHorizontal } = this.safeForm.value;

    this.imagePaths.base = this.baseImageMap[safeType] || `../../assets/img/closed_safe_type/1/base-default.png`;
    this.imagePaths.furniture = this.furnitureImageMap[safeFurniture] || '';
    this.imagePaths.outline = this.outlineImageMap[safeOutline] || '';
    this.imagePaths.threadVertical = this.threadVerticalImageMap[threadVertical] || '';
    this.imagePaths.threadHorizontal = this.threadHorizontalImageMap[threadHorizontal] || '';
  }
}
