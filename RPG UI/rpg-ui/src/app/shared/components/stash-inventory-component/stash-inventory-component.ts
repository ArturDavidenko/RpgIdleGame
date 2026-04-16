import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridCell, InventoryGridComponent } from '../inventory-grid-component/inventory-grid-component';
import { InventoryStateService } from '../../../core/inventory/state/inventory-state-service';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { NgFor } from '@angular/common';
import { InventoryItemComponent } from '../inventory-item-component/inventory-item-component';
import { InventoryDragContext, InventoryDragDropService } from '../../../core/inventory/interactions/inventory-drag-drop.service';
import { InventoryService } from '../../../core/inventory/domain/inventory.service';
import { SplitModalComponent } from '../split-modal-component/split-modal.component';

@Component({
  selector: 'app-stash-inventory-component',
  imports: [InventoryGridComponent, NgFor, InventoryItemComponent, SplitModalComponent],
  templateUrl: './stash-inventory-component.html',
  styleUrl: './stash-inventory-component.scss',
})
export class StashInventoryComponent implements OnInit {
  items: InventoryItemView[] = [];

  cols = 15;
  rows = 10;
  readonly cellSize = 32;

  splitVisible = false;
  selectedItem!: InventoryItemView;


  @ViewChild('gridRef', { static: true }) gridElement!: ElementRef;

  constructor(
    private inventoryState: InventoryStateService,
    public dragDrop: InventoryDragDropService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.inventoryState.itemsView$.subscribe(items => {
      this.items = items;
    });
  }

  get context(): InventoryDragContext {
    return {
      cols: this.cols,
      rows: this.rows,
      cellSize: this.cellSize,
    };
  }

  onItemMouseDown(data: { event: MouseEvent; item: InventoryItemView }) {
    const { event, item } = data;

    if (event.button !== 0) return;

    const rect = this.gridElement.nativeElement.getBoundingClientRect();

    this.dragDrop.startDrag(
      item,
      event.clientX,
      event.clientY,
      rect,
      this.cellSize
    );

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.gridElement.nativeElement.getBoundingClientRect();

    this.dragDrop.move(
      event.clientX,
      event.clientY,
      rect,
      this.context,
      this.items
    );
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    const result = this.dragDrop.drop(this.context, this.items);
    this.inventoryService.handleDrop(result);
  }

  onCellHover(cell: GridCell) {
    if (!this.dragDrop.draggedItem) {
      this.dragDrop.hoverCell = cell;
      this.dragDrop.hoverValid = true;
    }
  }

  isCellInHoverArea(cellX: number, cellY: number): boolean {
    const hoverCell = this.dragDrop.hoverCell;
    const draggedItem = this.dragDrop.draggedItem;

    if (!hoverCell || !draggedItem) return false;

    return (
      cellX >= hoverCell.x &&
      cellX < hoverCell.x + draggedItem.width &&
      cellY >= hoverCell.y &&
      cellY < hoverCell.y + draggedItem.height
    );
  }

  openSplit(item: InventoryItemView) {
    this.selectedItem = item;
    this.splitVisible = true;
  }
  
  onSplitConfirm(amount: number) {
    this.inventoryService.splitItem(this.selectedItem.uid, amount);
    this.splitVisible = false;
  }

  onSplitClose() {
    this.splitVisible = false;
  }
}
