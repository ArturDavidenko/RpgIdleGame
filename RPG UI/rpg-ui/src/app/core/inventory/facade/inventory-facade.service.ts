import { Injectable } from "@angular/core";
import { InventoryApiService } from "../../services/api/inventory-api.service";
import { InventoryStateService } from "../state/inventory-state-service";

@Injectable({
  providedIn: 'root'
})
export class InventoryFacade {

  constructor(  
    private api: InventoryApiService,
    private state: InventoryStateService
  ) {}

  init() {
    return Promise.all([
      this.api.getInventory().toPromise(),
      this.api.getItemDefinitions().toPromise()
    ]).then(([inventory, defs]) => {

      this.state.setDefinitions(defs!);
      this.state.setInventory(inventory!);

    });
  }

  saveInventory() {
    const inventory = this.state.getInventory();
 
    this.api.saveInventory(inventory).subscribe({
        next: () => alert('Inventory saved successfully'),
        error: (err) => alert('Save failed')
    });
  }
}