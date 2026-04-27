import { Injectable } from "@angular/core";
import { InventoryStateService } from "../state/inventory-state-service";
import { InventoryItem, ItemDefinition } from "../models/Inventory-item.model";

@Injectable({ providedIn: 'root' })
export class MergeHandler {

  handle(
    items: InventoryItem[],
    definitions: ItemDefinition[],
    sourceId: string,
    targetId: string
  ): InventoryItem[] {

    const source = items.find(i => i.id === sourceId);
    const target = items.find(i => i.id === targetId);

    if (!source || !target) return items;

    if (source.definitionId !== target.definitionId) return items;

    const def = definitions.find(d => d.id === source.definitionId);

    if (!def?.stackable || !def.maxStack) return items;

    const sourceQty = source.quantity ?? 1;
    const targetQty = target.quantity ?? 1;

    const spaceLeft = def.maxStack - targetQty;
    if (spaceLeft <= 0) return items;

    const transfer = Math.min(spaceLeft, sourceQty);

    return items
      .map(i => {
        if (i.id === target.id) {
          return { ...i, quantity: targetQty + transfer };
        }

        if (i.id === source.id) {
          const newQty = sourceQty - transfer;
          return { ...i, quantity: newQty };
        }

        return i;
      })
      .filter(i => i.id !== source.id || (i.quantity ?? 0) > 0);
  }
}