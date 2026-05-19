export type InventoryCommandType = 'MoveItem' | 'SplitItem' | 'MergeItem';

export interface MovePayload {
  toX: number;
  toY: number;
}

export interface SplitPayload {
  quantity: number;
}

export interface MergePayload {
  targetItemId: string;
}

export interface InventoryCommandBase {
  inventoryId: string;
  commandType: InventoryCommandType;
  itemId: string;
  definitionId: string;
}

export type InventoryCommandRequest =
  | (InventoryCommandBase & {
      commandType: 'MoveItem';
      move: MovePayload;
      split?: never;
      merge?: never;
    })
  | (InventoryCommandBase & {
      commandType: 'SplitItem';
      split: SplitPayload;
      move?: never;
      merge?: never;
    })
  | (InventoryCommandBase & {
      commandType: 'MergeItem';
      merge: MergePayload;
      move?: never;
      split?: never;
    });
