export enum ItemRarity {
  Common = 'Common',
  Magic = 'Magic',
  Rare = 'Rare',
  Unique = 'Unique'
}

export interface Inventory {
  id: string;
  type?: string;
  items: InventoryItem[];
}

export interface ItemDefinition {
  id: string; // "pickaxe", "gold", "wand"

  name: string;
  description?: string;

  type: 'weapon' | 'currency';

  width: number;
  height: number;

  textureUrl: string;
  rarity?: ItemRarity;
  stackable: boolean;
  maxStack?: number;
}

export interface InventoryItem {
  id: string;          
  definitionId: string;

  x: number;
  y: number;

  quantity?: number;
  rarity?: ItemRarity;
}

export interface InventoryItemView {
  uid: string;

  x: number;
  y: number;

  width: number;
  height: number;

  type: 'weapon' | 'currency';
  rarity?: ItemRarity;
  name: string;
  description?: string;
  textureUrl: string;

  quantity?: number;
  stackable: boolean;
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
      id: 'inv_001',
      definitionId: 'magic_wand',
      x: 0,
      y: 0,
    },
    {
      id: 'inv_002',
      definitionId: 'magic_wand',
      x: 2,
      y: 0,
    },
    {
      id: 'inv_003',
      definitionId: 'magic_wand',
      x: 4,
      y: 0,
    },
    {
      id: 'inv_004',
      definitionId: 'pickaxe',
      x: 6,
      y: 0,
    },
    {
      id: 'inv_005',
      definitionId: 'magic_wand',
      x: 8,
      y: 0,
    },
    {
      id: 'inv_006',
      definitionId: 'pickaxe',
      x: 10,
      y: 0,
    },
    {
      id: 'inv_007',
      definitionId: 'pickaxe',
      x: 12,
      y: 0,
    },
    {
      id: 'inv_008',
      definitionId: 'magic_wand',
      x: 6,
      y: 3,
    },
    {
      id: 'inv_009',
      definitionId: 'scream_orb',
      x: 14,
      y: 0,
    },
    {
      id: 'inv_010',
      definitionId: 'pickaxe',
      x: 10,
      y: 3,
    },
    {
      id: 'inv_011',
      definitionId: 'magic_wand',
      x: 12,
      y: 3,
    },
    {
      id: 'inv_012',
      definitionId: 'pickaxe',
      x: 0,
      y: 5,
    },
    {
      id: 'inv_013',
      definitionId: 'magic_wand',
      x: 2,
      y: 5,
    },
    {
      id: 'inv_014',
      definitionId: 'pickaxe',
      x: 4,
      y: 5,
    },
    {
      id: 'inv_015',
      definitionId: 'scream_orb',
      x: 14,
      y: 1,
      quantity: 5,
      rarity: ItemRarity.Common
    },
    {
      id: 'inv_016',
      definitionId: 'scream_orb',
      x: 14,
      y: 2,
      quantity: 1
    },
    {
      id: 'inv_017',
      definitionId: 'magic_wand',
      x: 8,
      y: 5,
      rarity: ItemRarity.Rare,
      quantity: 1
    }
];

export const MOCK_INVENTORY: Inventory = {
  id: 'stash',
  items: MOCK_INVENTORY_ITEMS
};