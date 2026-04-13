import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridCell, InventoryGridComponent } from '../inventory-grid-component/inventory-grid-component';
import { InventoryStateService } from '../../../core/services/states/inventory-state-service';
import { InventoryItem, InventoryItemView } from '../../../core/models/inventory/Inventory-item.model';
import { NgFor } from '@angular/common';
import { InventoryItemComponent } from '../inventory-item-component/inventory-item-component';

@Component({
  selector: 'app-stash-inventory-component',
  imports: [InventoryGridComponent, NgFor, InventoryItemComponent],
  templateUrl: './stash-inventory-component.html',
  styleUrl: './stash-inventory-component.scss',
})
export class StashInventoryComponent implements OnInit {
 items: InventoryItemView[] = [];
  cols = 15;
  rows = 10;
  readonly cellSize = 32;

  draggedItem: InventoryItemView | null = null;
  private dragStartX: number = 0;
  private dragStartY: number = 0;

  dragOffsetX = 0;
  dragOffsetY = 0;
  mouseX = 0;
  mouseY = 0;

  hoverCell: GridCell | null = null;
  hoverValid: boolean = false;

  @ViewChild('gridRef', { static: true }) gridElement!: ElementRef;

  constructor(private inventoryState: InventoryStateService) {}

  ngOnInit() {
    this.inventoryState.itemsView$.subscribe(items => {
      console.log('VIEW ITEMS', items);
      this.items = items;
    });
  }

  onItemMouseDown(data: { event: MouseEvent; item: InventoryItemView }) {
    const { event, item } = data;
    
    this.draggedItem = item;
    this.dragStartX = item.x;
    this.dragStartY = item.y;

    const rect = this.gridElement.nativeElement.getBoundingClientRect();
    const mouseGridX = event.clientX - rect.left;
    const mouseGridY = event.clientY - rect.top;

    this.dragOffsetX = mouseGridX - (item.x * this.cellSize);
    this.dragOffsetY = mouseGridY - (item.y * this.cellSize);

    this.mouseX = mouseGridX;
    this.mouseY = mouseGridY;

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.gridElement.nativeElement.getBoundingClientRect();
    const mouseGridX = event.clientX - rect.left;
    const mouseGridY = event.clientY - rect.top;

    if (this.draggedItem) {
      this.mouseX = mouseGridX;
      this.mouseY = mouseGridY;
      
      const itemLeft = this.mouseX - this.dragOffsetX;
      const itemTop = this.mouseY - this.dragOffsetY;
      
      const cellX = Math.round(itemLeft / this.cellSize);
      const cellY = Math.round(itemTop / this.cellSize);
      
      this.updateHoverCell(cellX, cellY);
    }
    
    event.preventDefault();
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    if (!this.draggedItem) return;

    const itemLeft = this.mouseX - this.dragOffsetX;
    const itemTop = this.mouseY - this.dragOffsetY;

    let dropX = Math.round(itemLeft / this.cellSize);
    let dropY = Math.round(itemTop / this.cellSize);

    dropX = Math.max(0, Math.min(dropX, this.cols - this.draggedItem.width));
    dropY = Math.max(0, Math.min(dropY, this.rows - this.draggedItem.height));

    if (this.canPlaceItem(this.draggedItem, dropX, dropY)) {

      const realItems = this.inventoryState.getItems();

      const updated = realItems.map(i => {
        if (i.uid === this.draggedItem!.uid) {
          return { ...i, x: dropX, y: dropY };
        }
        return i;
      });

      this.inventoryState.updateItems(updated);

    } else {
      this.mouseX = this.dragStartX * this.cellSize + this.dragOffsetX;
      this.mouseY = this.dragStartY * this.cellSize + this.dragOffsetY;
    }

    this.draggedItem = null;
    this.hoverCell = null;
  }

  onCellHover(cell: GridCell) {
    if (!this.draggedItem) {
      this.hoverCell = cell;
      this.hoverValid = true;
    }
  }

  private updateHoverCell(cellX: number, cellY: number) {
    if (!this.draggedItem) return;

    cellX = Math.max(0, Math.min(cellX, this.cols - this.draggedItem.width));
    cellY = Math.max(0, Math.min(cellY, this.rows - this.draggedItem.height));

    this.hoverCell = { x: cellX, y: cellY };
    this.hoverValid = this.canPlaceItem(this.draggedItem, cellX, cellY);
  }

  private canPlaceItem(item: InventoryItemView, x: number, y: number): boolean {
    if (x < 0 || y < 0 || x + item.width > this.cols || y + item.height > this.rows) {
      return false;
    }

    for (let dy = 0; dy < item.height; dy++) {
      for (let dx = 0; dx < item.width; dx++) {
        const collided = this.items.find(i =>
          i !== item &&
          x + dx >= i.x &&
          x + dx < i.x + i.width &&
          y + dy >= i.y &&
          y + dy < i.y + i.height
        );
        if (collided) return false;
      }
    }
    return true;
  }

  isCellInHoverArea(cellX: number, cellY: number): boolean {
    if (!this.hoverCell || !this.draggedItem) return false;
    
    return cellX >= this.hoverCell.x && 
           cellX < this.hoverCell.x + this.draggedItem.width &&
           cellY >= this.hoverCell.y && 
           cellY < this.hoverCell.y + this.draggedItem.height;
  }

  onCellClick(cell: { x: number; y: number }) {
    console.log('Clicked cell:', cell);
  }
  
}
