import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItemView } from '../../../core/models/inventory/Inventory-item.model';

@Component({
  selector: 'app-inventory-item-component',
  imports: [],
  templateUrl: './inventory-item-component.html',
  styleUrl: './inventory-item-component.scss',
})
export class InventoryItemComponent {
  @Input() item!: InventoryItemView;

  @Input() isDragging = false;
  @Input() dragX = 0;
  @Input() dragY = 0;

  @Output() hover = new EventEmitter<InventoryItemView>();
  @Output() hoverEnd = new EventEmitter<InventoryItemView>();

  @Output() mouseDown = new EventEmitter<{ event: MouseEvent; item: InventoryItemView }>();

  onMouseDown(event: MouseEvent) {
    this.mouseDown.emit({ event, item: this.item });
  }

  onMouseEnter() {
    this.hover.emit(this.item);
  }

  onMouseLeave() {
    this.hoverEnd.emit(this.item);
  }

  getTransform() {
    const x = this.isDragging
    ? this.dragX
    : (this.item.x ?? 0) * 32;

    const y = this.isDragging
      ? this.dragY
      : (this.item.y ?? 0) * 32;

    return `translate(${x}px, ${y}px)`;
  }
}
