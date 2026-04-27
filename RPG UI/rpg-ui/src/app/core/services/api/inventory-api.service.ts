import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory, ItemDefinition } from '../../inventory/models/Inventory-item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryApiService {
  constructor(private http: HttpClient) {}
  
  getInventory() {
    return this.http.get<Inventory>(
      `${environment.apiBaseUrl}/api/Inventory`
    );
  }

  getItemDefinitions() {
    return this.http.get<ItemDefinition[]>(
      `${environment.apiBaseUrl}/GameData/items-definitions`
    );
  }

  saveInventory(inventory: Inventory) {
    return this.http.post<Inventory>(
      `${environment.apiBaseUrl}/api/Inventory`,
      inventory
    );
  }
}
