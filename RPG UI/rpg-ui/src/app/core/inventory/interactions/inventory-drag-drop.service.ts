import { Injectable } from '@angular/core';
import { InventoryItemView } from '../models/Inventory-item.model';
import { GridCell } from '../../../shared/components/inventory-grid-component/inventory-grid-component';
import { InventoryRulesService } from '../rules/inventory-rules.service';
import { InventoryStateService } from '../state/inventory-state-service';

export interface InventoryDragContext {
  cols: number;
  rows: number;
  cellSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryDragDropService {
  draggedItem: InventoryItemView | null = null;

  dragStart = { x: 0, y: 0 };
  dragOffset = { x: 0, y: 0 };

  mouse = { x: 0, y: 0 };

  hoverCell: GridCell | null = null;
  hoverValid = false;

  constructor(
    private rules: InventoryRulesService,
    private state: InventoryStateService
  ) {}

  startDrag(
    item: InventoryItemView,
    mouseX: number,
    mouseY: number,
    rect: DOMRect,
    cellSize: number
  ) {
    this.draggedItem = item;

    this.dragStart = { x: item.x, y: item.y };

    const gridX = mouseX - rect.left;
    const gridY = mouseY - rect.top;

    this.dragOffset = {
      x: gridX - item.x * cellSize,
      y: gridY - item.y * cellSize,
    };

    this.mouse = { x: gridX, y: gridY };
  }

  move(
    mouseX: number,
    mouseY: number,
    rect: DOMRect,
    context: InventoryDragContext,
    items: InventoryItemView[]
  ) {
    if (!this.draggedItem) return;

    const gridX = mouseX - rect.left;
    const gridY = mouseY - rect.top;

    this.mouse = { x: gridX, y: gridY };

    const itemLeft = gridX - this.dragOffset.x;
    const itemTop = gridY - this.dragOffset.y;

    const cellX = Math.round(itemLeft / context.cellSize);
    const cellY = Math.round(itemTop / context.cellSize);

    this.updateHover(cellX, cellY, context, items);
  }

  private updateHover(
    cellX: number,
    cellY: number,
    context: InventoryDragContext,
    items: InventoryItemView[]
  ) {
    if (!this.draggedItem) return;

    const item = this.draggedItem;

    this.hoverCell = {
      x: Math.max(0, cellX),
      y: Math.max(0, cellY),
    };

    this.hoverValid = this.rules.canPlaceItem(
      item,
      cellX,
      cellY,
      items,
      context.cols,
      context.rows
    );
  }

  drop(
    context: InventoryDragContext,
    itemsView: InventoryItemView[]
  ) {
    if (!this.draggedItem) return;

    if (!this.hoverValid) {
      this.reset();
      return;
    }

    const item = this.draggedItem;

    const itemLeft = this.mouse.x - this.dragOffset.x;
    const itemTop = this.mouse.y - this.dragOffset.y;

    let dropX = Math.round(itemLeft / context.cellSize);
    let dropY = Math.round(itemTop / context.cellSize);

    dropX = Math.max(0, Math.min(dropX, context.cols - item.width));
    dropY = Math.max(0, Math.min(dropY, context.rows - item.height));

    const canPlace = this.rules.canPlaceItem(
      item,
      dropX,
      dropY,
      itemsView,
      context.cols,
      context.rows
    );

    if (canPlace) {
      const items = this.state.getItems();

      const updated = items.map(i => {
        if (i.uid === item.uid) {
          return { ...i, x: dropX, y: dropY };
        }
        return i;
      });

      this.state.updateItems(updated);
    }

    this.reset();
  }

  cancel() {
    this.reset();
  }

  private reset() {
    this.draggedItem = null;
    this.hoverCell = null;
    this.hoverValid = false;
  }
}
