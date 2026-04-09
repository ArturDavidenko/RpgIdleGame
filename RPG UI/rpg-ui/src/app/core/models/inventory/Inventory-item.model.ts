export interface InventoryItem {
  id: string;           
  name: string;         
  description?: string; 
  width: number;        
  height: number;
  x: number;
  y: number;       
  textureUrl: string;   
  rotation?: number;    
}

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'item1',
    name: 'Pickaxe',
    description: 'IDK just a pickaxe',
    width: 2,
    height: 3,
    x: 0,
    y: 0,
    textureUrl: 'assets/InventoryImages/pickaxe.png'
  },
  {
    id: 'item2',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats and add to item corrupted status',
    width: 1,
    height: 1,
    x: 2,
    y: 0,   
    textureUrl: 'assets/InventoryImages/scream-orb.png'
  },
  {
    id: 'item3',
    name: 'Magic Wand',
    description: 'A basic magic wand',
    width: 2,
    height: 5,
    x: 3,
    y: 0,
    textureUrl: 'assets/InventoryImages/magic-wand.png'
  },
  {
    id: 'item4',
    name: 'Magic Wand',
    description: 'A basic magic wand',
    width: 2,
    height: 5,
    x: 5,
    y: 0,
    textureUrl: 'assets/InventoryImages/magic-wand.png'
  },
  {
    id: 'item5',
    name: 'Magic Wand',
    description: 'A basic magic wand',
    width: 2,
    height: 5,
    x: 7,
    y: 0,
    textureUrl: 'assets/InventoryImages/magic-wand.png'
  },
  {
    id: 'item6',
    name: 'Magic Wand',
    description: 'A basic magic wand',
    width: 2,
    height: 5,
    x: 9,
    y: 0,
    textureUrl: 'assets/InventoryImages/magic-wand.png'
  },
  {
    id: 'item7',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats and add to item corrupted status',
    width: 1,
    height: 1,
    x: 11,
    y: 0,   
    textureUrl: 'assets/InventoryImages/scream-orb.png'
  },
  {
    id: 'item8',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats and add to item corrupted status',
    width: 1,
    height: 1,
    x: 12,
    y: 0,   
    textureUrl: 'assets/InventoryImages/scream-orb.png'
  },
  {
    id: 'item9',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats and add to item corrupted status',
    width: 1,
    height: 1,
    x: 13,
    y: 0,   
    textureUrl: 'assets/InventoryImages/scream-orb.png'
  },
  {
    id: 'item10',
    name: 'Scream orb',
    description: 'Unpredictable chance item stats and add to item corrupted status',
    width: 1,
    height: 1,
    x: 14,
    y: 0,   
    textureUrl: 'assets/InventoryImages/scream-orb.png'
  }
];