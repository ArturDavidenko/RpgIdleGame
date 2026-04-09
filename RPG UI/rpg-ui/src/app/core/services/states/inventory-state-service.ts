import { Injectable } from '@angular/core';
import { InventoryItem, MOCK_INVENTORY_ITEMS } from '../../models/inventory/Inventory-item.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class InventoryStateService {
  private itemsSubject = new BehaviorSubject<InventoryItem[]>([...MOCK_INVENTORY_ITEMS]);
  items$ = this.itemsSubject.asObservable();

  getItems(): InventoryItem[] {
    return this.itemsSubject.getValue();
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
    this.itemsSubject.next(current.filter(i => i.id !== itemId));
  }

  updateItem(updatedItem: InventoryItem) {
    const current = this.getItems();
    const index = current.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      current[index] = updatedItem;
      this.itemsSubject.next([...current]);
    }
  }

  updateItems(updatedItems: InventoryItem[]) {
    this.itemsSubject.next([...updatedItems]);
  }
}
