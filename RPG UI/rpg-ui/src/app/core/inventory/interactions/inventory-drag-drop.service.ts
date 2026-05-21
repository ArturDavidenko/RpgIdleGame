import { Injectable } from '@angular/core';
import { InventoryItemView } from '../models/Inventory-item.model';
import { GridCell } from '../../../shared/components/inventory-grid-component/inventory-grid-component';
import { InventoryRulesService } from '../rules/inventory-rules.service';
import { TooltipService } from '../../UI/Tooltip/tooltip.service';

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

  constructor(private rules: InventoryRulesService, private tooltipService: TooltipService) {}

  startDrag(
    item: InventoryItemView,
    mouseX: number,
    mouseY: number,
    rect: DOMRect,
    cellSize: number
  ) {
    this.tooltipService.setDragging(true);
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
    this.tooltipService.setDragging(false);

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

    const targetItem = this.resolveDropTarget(
      item,
      clampedX,
      clampedY,
      itemsView
    );

    const canPlace = this.rules.canPlaceItem(
      item,
      clampedX,
      clampedY,
      itemsView,
      context.cols,
      context.rows
    );

    if (!canPlace) {
      this.reset();
      return { type: 'invalid' };
    }

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

  resolveDropTarget(
    item: InventoryItemView,
    x: number,
    y: number,
    items: InventoryItemView[],
  ): InventoryItemView | null {

    return items.find(i => {
      if (i.uid === item.uid) return false;

      const isOverlapping =
        x < i.x + i.width &&
        x + item.width > i.x &&
        y < i.y + i.height &&
        y + item.height > i.y;

      return isOverlapping;
    }) ?? null;
  }

  private getStableCell(value: number, cellSize: number): number {
    const threshold = cellSize * 0.5;
    return Math.floor((value + threshold) / cellSize);
  }
}
