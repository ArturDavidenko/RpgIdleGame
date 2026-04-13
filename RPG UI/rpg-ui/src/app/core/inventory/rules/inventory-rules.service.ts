import { Injectable } from '@angular/core';
import { InventoryItemView } from '../models/Inventory-item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryRulesService {
  
  canPlaceItem(
    item: InventoryItemView,
    x: number,
    y: number,
    items: InventoryItemView[],
    cols: number,
    rows: number
  ): boolean {

    if (
      x < 0 ||
      y < 0 ||
      x + item.width > cols ||
      y + item.height > rows
    ) {
      return false;
    }

    for (let dy = 0; dy < item.height; dy++) {
      for (let dx = 0; dx < item.width; dx++) {

        const worldX = x + dx;
        const worldY = y + dy;

        const collided = items.find(i =>
          i.uid !== item.uid &&
          worldX >= i.x &&
          worldX < i.x + i.width &&
          worldY >= i.y &&
          worldY < i.y + i.height
        );

        if (collided) {
          return false;
        }
      }
    }

    return true;
  }
}
