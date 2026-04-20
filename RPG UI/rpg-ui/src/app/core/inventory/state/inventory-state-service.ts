import { Injectable } from '@angular/core';
import { Inventory, InventoryItem, InventoryItemView, ITEM_DEFINITIONS, ItemDefinition, MOCK_INVENTORY, MOCK_INVENTORY_ITEMS } from '../models/Inventory-item.model';
import { BehaviorSubject } from 'rxjs';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryStateService {
  private inventorySubject = new BehaviorSubject<Inventory>(MOCK_INVENTORY);
  private definitionsSubject = new BehaviorSubject<ItemDefinition[]>(ITEM_DEFINITIONS);
  
  inventory$ = this.inventorySubject.asObservable();
  definitions$ = this.definitionsSubject.asObservable();

  itemsView$ = combineLatest([this.inventory$, this.definitions$]).pipe(
    map(([inventory, definitions]) =>
      inventory.items.map(item => mapToView(item, definitions))
    )
  );

  getItems(): InventoryItem[] {
    return this.inventorySubject.getValue().items;
  }

  getInventory(): Inventory {
    return this.inventorySubject.getValue();
  }

  getDefinitions(): ItemDefinition[] {
    return this.definitionsSubject.getValue();
  }

  setInventory(inventory: Inventory) {
    this.inventorySubject.next({ ...inventory });
  }

  addItem(item: InventoryItem) {
    const inventory = this.getInventory();

    this.setInventory({
      ...inventory,
      items: [...inventory.items, item]
    });
  }

  removeItem(itemId: string) {
    const inventory = this.getInventory();

    this.setInventory({
      ...inventory,
      items: inventory.items.filter(i => i.uid !== itemId)
    });
  }

  updateItem(updatedItem: InventoryItem) {
    const inventory = this.getInventory();

    this.setInventory({
      ...inventory,
      items: inventory.items.map(i =>
        i.uid === updatedItem.uid ? updatedItem : i
      )
    });
  }

  updateItems(updatedItems: InventoryItem[]) {
    const inventory = this.getInventory();

    this.setInventory({
      ...inventory,
      items: [...updatedItems]
    });
  }
}

function mapToView(
  item: InventoryItem,
  definitions: ItemDefinition[]
): InventoryItemView {

  const def = definitions.find(d => d.id === item.definitionId)!;

  return {
    uid: item.uid,
    x: item.x,
    y: item.y,

    width: def.width,
    height: def.height,

    name: def.name,
    description: def.description,
    textureUrl: def.textureUrl,
    type: def.type,
    rarity: item.rarity,

    quantity: item.quantity,
    stackable: def.stackable
  };
}

