import { InventoryCommandRequest } from "../models/inventory-command-model";

export class InventoryCommandFactory {
  static move(inventoryId: string, definitionId: string, itemId: string, toX: number, toY: number): InventoryCommandRequest {
    return {
      inventoryId,
      definitionId,
      commandType: 'MoveItem',
      itemId,
      move: { toX, toY }
    };
  }

  static merge(inventoryId: string, definitionId: string, itemId: string, targetItemId: string): InventoryCommandRequest {
    return {
      inventoryId,
      definitionId,
      commandType: 'MergeItem',
      itemId,
      merge: { targetItemId }
    };
  }

  static split(inventoryId: string, definitionId: string, itemId: string, quantity: number): InventoryCommandRequest {
    return {
      inventoryId,
      definitionId,
      commandType: 'SplitItem',
      itemId,
      split: { quantity }
    };
  }
}