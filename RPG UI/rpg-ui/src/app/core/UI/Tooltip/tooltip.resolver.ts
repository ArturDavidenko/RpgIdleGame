import { Injectable } from "@angular/core";
import { InventoryItemView } from "../../inventory/models/Inventory-item.model";
import { TooltipModel } from "./tooltip.models";

@Injectable({ providedIn: 'root' })
export class TooltipResolver {

  resolve(item: InventoryItemView): TooltipModel {

    return {
      type: item.type,
      title: item.name,
      description: item.description,
      rarity: item.rarity
    };
  }
}