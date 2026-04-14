import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { InventoryStateService } from '../../../core/inventory/state/inventory-state-service';

@Component({
  selector: 'app-context-menu',
  imports: [NgIf],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent {
  @Input() item!: InventoryItemView;
  @Input() position: { x: number; y: number } = { x: 0, y: 0 };
  @Input() visible = false;

  @Output() close = new EventEmitter<void>();

  constructor(
    private inventoryState: InventoryStateService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent) {
    if (!this.visible) return;

    const target = event.target as Node;
    if (this.elementRef.nativeElement.contains(target)) {
      return;
    }

    this.close.emit();
  }

  onDelete() {
    this.inventoryState.removeItem(this.item.uid);
    this.close.emit();
  }
}