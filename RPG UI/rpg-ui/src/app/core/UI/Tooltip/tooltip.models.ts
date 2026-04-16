import { ItemRarity } from "../../inventory/models/Inventory-item.model";

export type TooltipType = 'weapon' | 'currency';

export interface TooltipModel {
  type: TooltipType;
  title: string;
  description?: string;
  rarity?: ItemRarity;
}