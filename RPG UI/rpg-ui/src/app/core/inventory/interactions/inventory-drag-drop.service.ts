import { Injectable } from '@angular/core';
import { InventoryItemView } from '../models/Inventory-item.model';
import { GridCell } from '../../../shared/components/inventory-grid-component/inventory-grid-component';
import { InventoryRulesService } from '../rules/inventory-rules.service';

export interface InventoryDragContext {
  cols: number;
  rows: number;
  cellSize: number;
}

export type DragDropResult = 
  | {
      type: 'invalid';
    }
  | {
      type: 'drop';
      itemId: string;
      position: { x: number; y: number };
      targetItemId?: string;
    };

@Injectable({
  providedIn: 'root',
})
export class InventoryDragDropService {
  draggedItem: InventoryItemView | null = null;

  dragOffset = { x: 0, y: 0 };
  mouse = { x: 0, y: 0 };

  hoverCell: GridCell | null = null;
  hoverValid = false;

  constructor(private rules: InventoryRulesService) {}

  startDrag(
    item: InventoryItemView,
    mouseX: number,
    mouseY: number,
    rect: DOMRect,
    cellSize: number
  ) {
    this.draggedItem = item;

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

    const cellX = this.getStableCell(itemLeft, context.cellSize);
    const cellY = this.getStableCell(itemTop, context.cellSize);

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

    const normalizedX = Math.max(0, cellX);
    const normalizedY = Math.max(0, cellY);

    this.hoverCell = {
      x: normalizedX,
      y: normalizedY,
    };

    this.hoverValid = this.rules.canPlaceItem(
      item,
      normalizedX,
      normalizedY,
      items,
      context.cols,
      context.rows
    );
  }

  drop(
    context: InventoryDragContext,
    itemsView: InventoryItemView[]
  ): DragDropResult {
    if (!this.draggedItem) {
      return { type: 'invalid' };
    }

    const item = this.draggedItem;

    const itemLeft = this.mouse.x - this.dragOffset.x;
    const itemTop = this.mouse.y - this.dragOffset.y;

    const dropX = this.getStableCell(itemLeft, context.cellSize);
    const dropY = this.getStableCell(itemTop, context.cellSize);

    const clampedX = Math.max(0, Math.min(dropX, context.cols - item.width));
    const clampedY = Math.max(0, Math.min(dropY, context.rows - item.height));

    const targetItem = this.findItemAtPosition(
      clampedX,
      clampedY,
      item.width,
      item.height,
      itemsView,
      item.uid
    );

    const result: DragDropResult = {
      type: 'drop',
      itemId: item.uid,
      position: { x: clampedX, y: clampedY },
      targetItemId: targetItem?.uid,
    };

    this.reset();
    return result;
  }

  cancel() {
    this.reset();
  }

  private reset() {
    this.draggedItem = null;
    this.hoverCell = null;
    this.hoverValid = false;
  }

  private findItemAtPosition(
    x: number,
    y: number,
    width: number,
    height: number,
    items: InventoryItemView[],
    ignoreUid?: string
  ): InventoryItemView | null {
    return (
      items.find(item => {
        if (ignoreUid && item.uid === ignoreUid) return false;

        return !(
          x + width <= item.x ||
          x >= item.x + item.width ||
          y + height <= item.y ||
          y >= item.y + item.height
        );
      }) ?? null
    );
  }

  private getStableCell(value: number, cellSize: number): number {
    const threshold = cellSize * 0.5;
    return Math.floor((value + threshold) / cellSize);
  }
}
