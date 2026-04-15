import { Injectable } from '@angular/core';
import { DragDropResult } from '../interactions/inventory-drag-drop.service';
import { InventoryStateService } from '../state/inventory-state-service';
import { MergeHandler } from '../handlers/mergeHandler';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  
  constructor(private InventoryStateService: InventoryStateService,
    private mergeHandler: MergeHandler
  ) {}

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
      if (i.uid === itemId) {
        return { ...i, x, y };
      }
      return i;
    });

    this.InventoryStateService.updateItems(updated);
  }
}
