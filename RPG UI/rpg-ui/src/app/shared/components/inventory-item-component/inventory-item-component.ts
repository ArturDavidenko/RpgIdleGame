import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItem } from '../../../core/models/inventory/Inventory-item.model';

@Component({
  selector: 'app-inventory-item-component',
  imports: [],
  templateUrl: './inventory-item-component.html',
  styleUrl: './inventory-item-component.scss',
})
export class InventoryItemComponent {
  @Input() item!: InventoryItem;

  @Input() isDragging = false;
  @Input() dragX = 0;
  @Input() dragY = 0;

  @Output() hover = new EventEmitter<InventoryItem>();
  @Output() hoverEnd = new EventEmitter<InventoryItem>();

  @Output() mouseDown = new EventEmitter<{ event: MouseEvent; item: InventoryItem }>();

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

    const rotation = this.item.rotation || 0;

    return `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
  }
}
