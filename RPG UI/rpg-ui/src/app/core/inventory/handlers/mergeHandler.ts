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

    const source = items.find(i => i.uid === sourceId);
    const target = items.find(i => i.uid === targetId);

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
        if (i.uid === target.uid) {
          return { ...i, quantity: targetQty + transfer };
        }

        if (i.uid === source.uid) {
          const newQty = sourceQty - transfer;
          return { ...i, quantity: newQty };
        }

        return i;
      })
      .filter(i => i.uid !== source.uid || (i.quantity ?? 0) > 0);
  }
}