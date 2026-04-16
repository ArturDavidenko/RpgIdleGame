import { Injectable } from '@angular/core';
import { InventoryItem, InventoryItemView, ITEM_DEFINITIONS, ItemDefinition, MOCK_INVENTORY_ITEMS } from '../models/Inventory-item.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryStateService {
  private itemsSubject = new BehaviorSubject<InventoryItem[]>(MOCK_INVENTORY_ITEMS);
  private definitionsSubject = new BehaviorSubject<ItemDefinition[]>(ITEM_DEFINITIONS);
  

  items$ = this.itemsSubject.asObservable();
  definitions$ = this.definitionsSubject.asObservable();

  itemsView$ = combineLatest([this.items$, this.definitions$]).pipe(
    map(([items, definitions]) =>
      items.map(item => mapToView(item, definitions))
    )
  );

  getItems(): InventoryItem[] {
    return this.itemsSubject.getValue();
  }

  getDefinitions(): ItemDefinition[] {
    return this.definitionsSubject.getValue();
  }

  setItems(items: InventoryItem[]) {
    this.itemsSubject.next(items);
  }

  addItem(item: InventoryItem) {
    const current = this.getItems();
    this.itemsSubject.next([...current, item]);
  }

  removeItem(itemId: string) {
    const current = this.getItems();
    this.itemsSubject.next(current.filter(i => i.uid !== itemId));
  }

  updateItem(updatedItem: InventoryItem) {
    const current = this.getItems();
    const index = current.findIndex(i => i.uid === updatedItem.uid);
    if (index !== -1) {
      current[index] = updatedItem;
      this.itemsSubject.next([...current]);
    }
  }

  updateItems(updatedItems: InventoryItem[]) {
    this.itemsSubject.next([...updatedItems]);
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

