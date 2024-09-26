import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { 
  SAFE_TYPES, 
  SAFE_FURNITURES, 
  SAFE_THREADS, 
  SAFE_FINISHES, 
  SHELF_COUNTS, 
  WOOD_COLORS, 
  SAFE_TYPE_INDICES,
  SAFE_FURNITURE_INDICES,
  SAFE_THREAD_INDICES,
  SAFE_FINISHING_INDICES,
  SHELF_COUNT_INDICES_WOOD,
  SHELF_COUNT_INDICES_MECHANISM,
  WOOD_COLOR_INDICES,
  SafeOption 
} from './safe-config.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // Опции
  safeTypes: SafeOption[] = SAFE_TYPES;
  safeFurnitures: SafeOption[] = SAFE_FURNITURES;
  safeThreads: SafeOption[] = SAFE_THREADS;
  safeFinishes: SafeOption[] = SAFE_FINISHES;
  shelfCounts: SafeOption[] = SHELF_COUNTS;
  woodColors: SafeOption[] = WOOD_COLORS;

  // Reactive Form
  safeForm: FormGroup;

  // Пути к изображениям
  imagePaths: { [key: string]: string } = {};

  // Свойства для лупы
  magnifierVisible = false;
  magnifierStyles: { [key: string]: string } = {};
  magnifierContentStyles: { [key: string]: string } = {};
  imageContainerRect: DOMRect | null = null;

    // Переменная состояния отображения (1 - начальное, 2 - расширенное)
    stage: number = 1;

  constructor(
    private titleService: Title,
    private fb: FormBuilder
  ) {
    this.titleService.setTitle("Конфигуратор Сейфа");

    // Инициализация формы
    this.safeForm = this.fb.group({
      safeType: ['Black'],
      safeFurniture: ['Bronze'],
      safeOutline: ['Black'],
      threadVertical: ['Black'],
      threadHorizontal: ['Black'],
      safeFinishing: ['Black'],
      shelfCount: ['5'],
      woodColor: ['ebony_grigio'],
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
    const { 
      safeType, 
      safeFurniture, 
      safeOutline, 
      threadVertical, 
      threadHorizontal, 
      safeFinishing, 
      shelfCount, 
      woodColor 
    } = this.safeForm.value;

    const safeTypeIndex = SAFE_TYPE_INDICES[safeType] || 1;
    const safeFurnitureIndex = SAFE_FURNITURE_INDICES[safeFurniture] || 1;
    const safeOutlineIndex = SAFE_TYPE_INDICES[safeOutline] || 1;
    const threadVerticalIndex = SAFE_THREAD_INDICES[threadVertical] || 1;
    const threadHorizontalIndex = SAFE_THREAD_INDICES[threadHorizontal] || 1;
    const safeFinishingIndex = SAFE_FINISHING_INDICES[safeFinishing] || 1;
    const shelfCountIndexWood = SHELF_COUNT_INDICES_WOOD[shelfCount] || 1;
    const shelfCountIndexMechanism = SHELF_COUNT_INDICES_MECHANISM[shelfCount] || 1;
    const woodColorIndex = WOOD_COLOR_INDICES[woodColor] || 1;

    // Обновление путей к изображениям
    this.imagePaths['base'] = `../../assets/img/common/1/base-${safeTypeIndex}.png`;
    this.imagePaths['furniture'] = `../../assets/img/common/2/furnite-${safeFurnitureIndex}.png`;
    this.imagePaths['outline'] = `../../assets/img/common/3/outline-${safeOutlineIndex}.png`;
    this.imagePaths['threadVertical'] = `../../assets/img/closed/4/thread-vertical-${threadVerticalIndex}.png`;
    this.imagePaths['threadHorizontal'] = `../../assets/img/closed/5/thread-horizontal-${threadHorizontalIndex}.png`;
    this.imagePaths['finishing'] = `../../assets/img/opened/5/finishing-${safeFinishingIndex}.png`;
    this.imagePaths['wood'] = `../../assets/img/opened/6/6-${shelfCountIndexWood}/wood-${woodColorIndex}.png`;
    this.imagePaths['finishingMechanism'] = `../../assets/img/opened/7/7-${shelfCountIndexMechanism}/7-${shelfCountIndexMechanism}-1/finishing-${safeFinishingIndex}.png`;
    this.imagePaths['furnitureMechanism'] = `../../assets/img/opened/7/7-${shelfCountIndexMechanism}/7-${shelfCountIndexMechanism}-2/furnite-${safeFurnitureIndex}.png`;
    this.imagePaths['dor'] = `../../assets/img/opened/4/dor-${safeTypeIndex}.png`;
    this.imagePaths['dorFurniture'] = `../../assets/img/opened/8/furnite-${safeFurnitureIndex}.png`;
    this.imagePaths['dorThread'] = `../../assets/img/opened/9/thread-horizontal-${threadHorizontalIndex}.png`;
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

    if (!this.imageContainerRect) {
      this.imageContainerRect = imageContainer.getBoundingClientRect();
    }

    const magnifierSize = 200; // Размер лупы
    const scale = 3; // Коэффициент увеличения (можете настроить по желанию)

    // Координаты курсора относительно контейнера изображений
    let x = event.clientX - this.imageContainerRect.left;
    let y = event.clientY - this.imageContainerRect.top;

    // Позиция лупы
    let magnifierX = x - magnifierSize / 2;
    let magnifierY = y - magnifierSize / 2;

    // Предотвращаем выход лупы за пределы контейнера
    magnifierX = Math.max(0, Math.min(magnifierX, this.imageContainerRect.width - magnifierSize));
    magnifierY = Math.max(0, Math.min(magnifierY, this.imageContainerRect.height - magnifierSize));

    // Смещение содержимого лупы
    const bgX = - (x * scale - magnifierSize / 2);
    const bgY = - (y * scale - magnifierSize / 2);

    // Обновляем стили лупы
    this.magnifierStyles = {
      top: `${magnifierY}px`,
      left: `${magnifierX}px`,
      width: `${magnifierSize}px`,
      height: `${magnifierSize}px`,
      overflow: 'hidden',
      border: '3px solid #e6b284',
      'border-radius': '20%',
      position: 'absolute',
      'pointer-events': 'none',
      'z-index': '10',
    };

    // Обновляем стили содержимого лупы
    this.magnifierContentStyles = {
      transform: `scale(${scale})`,
      'transform-origin': 'top left',
      position: 'absolute',
      top: `${bgY}px`,
      left: `${bgX}px`,
      width: `${this.imageContainerRect.width}px`,
      height: `${this.imageContainerRect.height}px`,
    };
  }

  // Методы для управления стрелками
  goToNextStage(): void {
    if (this.stage < 2) {
      this.stage++;
    }
  }

  goToPreviousStage(): void {
    if (this.stage > 1) {
      this.stage--;
    }
  }

  // Методы для определения состояния стрелок
  isNextDisabled(): boolean {
    return this.stage >= 2;
  }

  isPreviousDisabled(): boolean {
    return this.stage <= 1;
  }
}
