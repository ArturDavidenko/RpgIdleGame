export interface ItemDefinition {
  id: string; // "pickaxe", "gold", "wand"

  name: string;
  description?: string;

  type: 'weapon' | 'currency';

  width: number;
  height: number;

  textureUrl: string;

  stackable: boolean;
  maxStack?: number;
}

export interface InventoryItem {
  uid: string;          
  definitionId: string;

  x: number;
  y: number;

  quantity?: number;
}

export interface InventoryItemView {
  uid: string;

  x: number;
  y: number;

  width: number;
  height: number;

  name: string;
  description?: string;
  textureUrl: string;

  quantity?: number;
}

export const ITEM_DEFINITIONS: ItemDefinition[] = [
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    description: 'IDK just a pickaxe',
    type: 'weapon',
    width: 2,
    height: 3,
    textureUrl: 'assets/InventoryImages/pickaxe.png',
    stackable: false
  },
  {
    id: 'magic_wand',
    name: 'Magic Wand',
    description: 'A basic magic wand',
    type: 'weapon',
    width: 2,
    height: 5,
    textureUrl: 'assets/InventoryImages/magic-wand.png',
    stackable: false
  },
  {
    id: 'scream_orb',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats',
    type: 'currency',
    width: 1,
    height: 1,
    textureUrl: 'assets/InventoryImages/scream-orb.png',
    stackable: true,
    maxStack: 20
  }
];

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    uid: 'inv_1',
    definitionId: 'pickaxe',
    x: 0,
    y: 0
  },
  {
    uid: 'inv_2',
    definitionId: 'scream_orb',
    x: 2,
    y: 0,
    quantity: 5
  },
  {
    uid: 'inv_3',
    definitionId: 'magic_wand',
    x: 3,
    y: 0
  },
  {
    uid: 'inv_4',
    definitionId: 'magic_wand',
    x: 5,
    y: 0
  },
  {
    uid: 'inv_5',
    definitionId: 'magic_wand',
    x: 7,
    y: 0
  },
  {
    uid: 'inv_6',
    definitionId: 'magic_wand',
    x: 9,
    y: 0
  },
  {
    uid: 'inv_7',
    definitionId: 'scream_orb',
    x: 11,
    y: 0,
    quantity: 3
  },
  {
    uid: 'inv_8',
    definitionId: 'scream_orb',
    x: 12,
    y: 0,
    quantity: 7
  }
];