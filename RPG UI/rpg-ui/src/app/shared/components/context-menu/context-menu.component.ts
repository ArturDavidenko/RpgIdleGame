import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { InventoryStateService } from '../../../core/inventory/state/inventory-state-service';
import { InventoryCommandFactory } from '../../../core/inventory/mapper/InventoryCommandFactory';
import { InventoryFacade } from '../../../core/inventory/facade/inventory-facade.service';

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
  @Output() split = new EventEmitter<InventoryItemView>();

  constructor(
    private inventoryState: InventoryStateService,
    private elementRef: ElementRef,
    private inventoryFacade: InventoryFacade
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
    const command = InventoryCommandFactory.drop(
      this.inventoryState.getInventoryId(),
      this.item.definitionId,
      this.item.uid
    );

    this.inventoryFacade.InventoryAction(command);
    this.close.emit();
  }

  onSplit() {
    this.split.emit(this.item);
  }
}