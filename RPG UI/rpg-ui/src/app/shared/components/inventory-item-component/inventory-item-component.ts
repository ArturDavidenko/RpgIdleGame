import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { TooltipService } from '../../../core/UI/Tooltip/tooltip.service';

@Component({
  selector: 'app-inventory-item-component',
  imports: [ContextMenuComponent],
  templateUrl: './inventory-item-component.html',
  styleUrl: './inventory-item-component.scss',
})
export class InventoryItemComponent {
  @Input() item!: InventoryItemView;

  @Input() isDragging = false;
  @Input() dragX = 0;
  @Input() dragY = 0;
  
  @Output() split = new EventEmitter<InventoryItemView>();

  @Output() hover = new EventEmitter<InventoryItemView>();
  @Output() hoverEnd = new EventEmitter<InventoryItemView>();

  @Output() mouseDown = new EventEmitter<{ event: MouseEvent; item: InventoryItemView }>();

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };

  constructor(private tooltipService: TooltipService) {}

  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;
    this.mouseDown.emit({ event, item: this.item });
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuVisible = true;
  }

  onContextMenuClose() {
    this.contextMenuVisible = false;
  }

  onMouseEnter(event: MouseEvent) {
    this.hover.emit(this.item);

    this.tooltipService.show(this.item, event);
  }

  onMouseLeave() {
    this.hoverEnd.emit(this.item);

    this.tooltipService.hide();
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

  onSplit(item: InventoryItemView) {
    this.split.emit(item);
    this.onContextMenuClose();
  }
}
