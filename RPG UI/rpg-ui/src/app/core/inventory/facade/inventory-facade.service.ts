import { Injectable } from "@angular/core";
import { InventoryApiService } from "../../services/api/inventory-api.service";
import { InventoryStateService } from "../state/inventory-state-service";
import { InventoryCommandRequest } from "../models/inventory-command-model";
import { DragDropResult } from "../interactions/inventory-drag-drop.service";
import { InventoryService } from "../domain/inventory.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryFacade {

  constructor(  
    private api: InventoryApiService,
    private state: InventoryStateService,
    private inventoryService: InventoryService
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

    console.log('Try Saving inventory:', inventory);
 
    this.api.saveInventory(inventory).subscribe({
        next: () => alert('Inventory saved successfully'),
        error: (err) => alert('Save failed')
    });
  }

  generateRandomItem() {
    this.api.generateRandomItem().subscribe({
      next: (item) => {
        this.state.addItem(item);
      },
      error: (err) => {
        if (err.error?.message === 'Inventory is full') {
          alert('Inventory is full');
        } else {
          alert('Failed to generate item');
        }
      }
    });
  }

  InventoryAction(command: InventoryCommandRequest, dropResult: DragDropResult) {
    const snapshot = structuredClone(this.state.getInventory());

    this.inventoryService.handleDrop(dropResult);

    this.api.InventoryActionCommand(command).subscribe({
      next: () => {
      
      },
      error: (err) => {
        this.state.setInventory(snapshot);
      }
    });
  }
}