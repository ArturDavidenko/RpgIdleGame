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

  InventoryAction(command: InventoryCommandRequest, dropResult?: DragDropResult) {
    const snapshot = structuredClone(this.state.getInventory());
    let tempId: string | undefined;

    try {

      switch (command.commandType) {

        case 'MoveItem':
        case 'MergeItem':

          if (!dropResult) {
            console.warn('DropResult is required');
            return;
          }

          this.inventoryService.handleDrop(dropResult);
          break;

        case 'SplitItem':

          tempId = this.inventoryService.splitItem(
            command.itemId,
            command.split.quantity
          );

          break;


        case 'DropItem':
            this.state.removeItem(command.drop.ItemId);
          break;

        default:
          console.warn('Unknown inventory command');
          return;
      }

      this.api.InventoryActionCommand(command).subscribe({
        next: (response) => {
          if (
          command.commandType === 'SplitItem' &&
          tempId
          ) {
            this.state.replaceItemId(
              tempId,
              response.newItemId!
            );
          }
        },
        error: () => {
          this.state.setInventory(snapshot);
        }
      });

    } catch (e) {

      console.error(e);

      this.state.setInventory(snapshot);
    }
  }
}