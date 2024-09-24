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

  // Свойства для лупы
  magnifierVisible = false;
  magnifierStyles: { [key: string]: string } = {};
  magnifierContentStyles: { [key: string]: string } = {};
  imageContainerRect: DOMRect | null = null;

  constructor(
    private titleService: Title,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle("Конфигуратор Сейфа");

    // Инициализация маппингов (можно вынести в константы при необходимости)
    this.safeTypes.forEach((option, index) => {
      this.baseImageMap[option.value] = `../../assets/img/common/1/base-${index + 1}.png`;
      this.outlineImageMap[option.value] = `../../assets/img/common/3/outline-${index + 1}.png`;
    });

    this.safeFurnitures.forEach((option, index) => {
      this.furnitureImageMap[option.value] = `../../assets/img/common/2/furnite-${index + 1}.png`;
    });

    this.safeThreads.forEach((option, index) => {
      this.threadVerticalImageMap[option.value] = `../../assets/img/closed/4/thread-vertical-${index + 1}.png`;
      this.threadHorizontalImageMap[option.value] = `../../assets/img/closed/5/thread-horizontal-${index + 1}.png`;
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

 // Методы для лупы
 showMagnifier(): void {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return; // Отключить на сенсорных устройствах
  this.magnifierVisible = true;
}

hideMagnifier(): void {
  this.magnifierVisible = false;
  this.imageContainerRect = null;
}

moveMagnifier(event: MouseEvent): void {
  const imageContainer = event.currentTarget as HTMLElement;

  // Получаем размеры контейнера изображений
  if (!this.imageContainerRect) {
    this.imageContainerRect = imageContainer.getBoundingClientRect();
  }

  const magnifierSize = 200; // Размер лупы в пикселях
  const scale = 4; // Коэффициент увеличения

  // Координаты курсора относительно контейнера изображений
  let x = event.clientX - this.imageContainerRect.left;
  let y = event.clientY - this.imageContainerRect.top;

  // Предотвращаем выход курсора за пределы изображения
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > this.imageContainerRect.width) x = this.imageContainerRect.width;
  if (y > this.imageContainerRect.height) y = this.imageContainerRect.height;

  // Позиция лупы
  let magnifierX = x - magnifierSize / (scale*magnifierSize/100);
  let magnifierY = y - magnifierSize / (scale*magnifierSize/100);

  // Предотвращаем выход лупы за пределы контейнера
  if (magnifierX < 0) magnifierX = 0;
  if (magnifierY < 0) magnifierY = 0;
  if (magnifierX > this.imageContainerRect.width - magnifierSize) magnifierX = this.imageContainerRect.width - magnifierSize;
  if (magnifierY > this.imageContainerRect.height - magnifierSize) magnifierY = this.imageContainerRect.height - magnifierSize;

  // Позиция увеличенного изображения внутри лупы
  const bgPosX = -magnifierX * scale;
  const bgPosY = -magnifierY * scale;

  // Обновляем стили лупы
  this.magnifierStyles = {
    top: `${magnifierY}px`,
    left: `${magnifierX}px`,
    width: `${magnifierSize}px`,
    height: `${magnifierSize}px`,
  };

  this.magnifierContentStyles = {
    width: `${this.imageContainerRect.width}px`,
    height: `${this.imageContainerRect.height}px`,
    transform: `translate(${bgPosX}px, ${bgPosY}px) scale(${scale})`,
    transformOrigin: 'top left',
  };
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
