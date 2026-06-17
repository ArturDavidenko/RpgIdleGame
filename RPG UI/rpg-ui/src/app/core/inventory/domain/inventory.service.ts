import { Injectable } from '@angular/core';
import { DragDropResult } from '../interactions/inventory-drag-drop.service';
import { InventoryStateService } from '../state/inventory-state-service';
import { MergeHandler } from '../handlers/mergeHandler';
import { InventoryGridConfig, InventoryItem, ItemDefinition } from '../models/Inventory-item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  
  constructor(private InventoryStateService: InventoryStateService,
    private mergeHandler: MergeHandler
  ) {}

  private get gridConfig(): InventoryGridConfig {
    const inventory = this.InventoryStateService.getInventory();

    return {
        cols: inventory.width,
        rows: inventory.height
    };
  }

 handleDrop(result: DragDropResult) {
    if (result.type === 'invalid') return;

    const items = this.InventoryStateService.getItems();

    if (result.targetItemId) {
      const definitions = this.InventoryStateService.getDefinitions();

      const updated = this.mergeHandler.handle(
        items,
        definitions,
        result.itemId,
        result.targetItemId
      );

      this.InventoryStateService.updateItems(updated);
      return;
    }

    this.moveItem(result.itemId, result.position.x, result.position.y);
  }

  private moveItem(itemId: string, x: number, y: number) {
    const items = this.InventoryStateService.getItems();

    const updated = items.map(i => {
      if (i.id === itemId) {
        return { ...i, x, y };
      }
      return i;
    });

    this.InventoryStateService.updateItems(updated);
  }

  splitItem(itemId: string, amount: number): string | undefined {
    const items = this.InventoryStateService.getItems();

    const target = items.find(i => i.id === itemId);
    if (!target || !target.quantity || target.quantity <= amount) {
      console.warn('Invalid split');
      return;
    }

    const tempId = crypto.randomUUID()
    const remaining = target.quantity - amount;

    const newItem: InventoryItem = {
      id: tempId,
      definitionId: target.definitionId,
      x: 0,
      y: 0,
      quantity: amount
    };

    const updatedItems = items.map(i => {
      if (i.id === itemId) {
        return {
          ...i,
          quantity: remaining
        };
      }
      return i;
    });

    const finalItems = this.placeInFreeSlot(updatedItems, newItem);

    if (!finalItems) {
      return;
    }

    this.InventoryStateService.updateItems(finalItems);

    return tempId;
  }

  private placeInFreeSlot(
    items: InventoryItem[],
    newItem: InventoryItem
  ): InventoryItem[] {

    const GRID_WIDTH = this.gridConfig.cols; 
    const GRID_HEIGHT = this.gridConfig.rows;

    const definitions = this.InventoryStateService.getDefinitions();

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {

        const canPlace = this.doesItemFitAtPosition(
          items,
          newItem,
          x,
          y,
          definitions
        );

        if (canPlace) {
          newItem.x = x;
          newItem.y = y;
          return [...items, newItem];
        }
      }
    }

    console.warn('No free slot found');
    return items;
  }

  private doesItemFitAtPosition(
    items: InventoryItem[],
    newItem: InventoryItem,
    x: number,
    y: number,
    definitions: ItemDefinition[]
  ): boolean {

    const def = definitions.find(d => d.id === newItem.definitionId)!;

    const newWidth = def.width;
    const newHeight = def.height;

    for (const item of items) {
      const itemDef = definitions.find(d => d.id === item.definitionId)!;

      const w = itemDef.width;
      const h = itemDef.height;

      const overlap =
        x < item.x + w &&
        x + newWidth > item.x &&
        y < item.y + h &&
        y + newHeight > item.y;

      if (overlap) {
        return false;
      }
    }

    return true;
  }

}
