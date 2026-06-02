import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GridCell, InventoryGridComponent } from '../inventory-grid-component/inventory-grid-component';
import { InventoryStateService } from '../../../core/inventory/state/inventory-state-service';
import { InventoryGridConfig, InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { NgFor } from '@angular/common';
import { InventoryItemComponent } from '../inventory-item-component/inventory-item-component';
import { InventoryDragContext, InventoryDragDropService } from '../../../core/inventory/interactions/inventory-drag-drop.service';
import { SplitModalComponent } from '../split-modal-component/split-modal.component';
import { ItemTooltipComponent } from '../item-tooltip-component/item-tooltip-component';
import { InventoryFacade } from '../../../core/inventory/facade/inventory-facade.service';
import { InventoryCommandFactory } from '../../../core/inventory/mapper/InventoryCommandFactory';

@Component({
  selector: 'app-stash-inventory-component',
  imports: [InventoryGridComponent, NgFor, InventoryItemComponent, SplitModalComponent, ItemTooltipComponent],
  templateUrl: './stash-inventory-component.html',
  styleUrl: './stash-inventory-component.scss',
})
export class StashInventoryComponent implements OnInit {
  items: InventoryItemView[] = [];

  readonly cellSize = 32;

  splitVisible = false;
  selectedItem!: InventoryItemView;

  gridConfig!: InventoryGridConfig;

  @ViewChild('gridRef', { static: true }) gridElement!: ElementRef;
 
  constructor(
    private inventoryState: InventoryStateService,
    public dragDrop: InventoryDragDropService,
    private inventoryFacade: InventoryFacade
  ) { }

  ngOnInit() {
    this.inventoryState.itemsView$.subscribe(items => {
      this.items = items;
    });

    this.inventoryState.gridConfig$
      .subscribe(cfg => {
        this.gridConfig = cfg;
      });
  }

  get context(): InventoryDragContext {
    return {
      cols: this.gridConfig.cols,
      rows: this.gridConfig.rows,
      cellSize: this.cellSize,
    };
  }

  onSave() {
    this.inventoryFacade.saveInventory();
  }

  onGenerateItem() {
   this.inventoryFacade.generateRandomItem();
  }

  onItemMouseDown(data: { event: MouseEvent; item: InventoryItemView }) {
    const { event, item } = data;

    if (event.button !== 0) return;

    const rect = this.gridElement.nativeElement.getBoundingClientRect();

    this.dragDrop.startDrag(
      item,
      event.clientX,
      event.clientY,
      rect,
      this.cellSize
    );

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.gridElement.nativeElement.getBoundingClientRect();

    this.dragDrop.move(
      event.clientX,
      event.clientY,
      rect,
      this.context,
      this.items
    );
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    const result = this.dragDrop.drop(this.context, this.items);

    console.log('Drop result:', result);

    if (result.type !== 'drop') return;

    const inventoryId = this.inventoryState.getInventoryId();
    const itemDefinicitonId = this.inventoryState.getItemDefinicitonId(result.itemId);
    const command = result.targetItemId
      ? InventoryCommandFactory.merge(inventoryId, itemDefinicitonId, result.itemId, result.targetItemId)
      : InventoryCommandFactory.move(inventoryId, itemDefinicitonId, result.itemId, result.position.x, result.position.y);

    this.inventoryFacade.InventoryAction(command, result);
  }

  onCellHover(cell: GridCell) {
    if (!this.dragDrop.draggedItem) {
      this.dragDrop.hoverCell = cell;
      this.dragDrop.hoverValid = true;
    }
  }

  isCellInHoverArea(cellX: number, cellY: number): boolean {
    const hoverCell = this.dragDrop.hoverCell;
    const draggedItem = this.dragDrop.draggedItem;

    if (!hoverCell || !draggedItem) return false;

    return (
      cellX >= hoverCell.x &&
      cellX < hoverCell.x + draggedItem.width &&
      cellY >= hoverCell.y &&
      cellY < hoverCell.y + draggedItem.height
    );
  }

  openSplit(item: InventoryItemView) {
    this.selectedItem = item;
    this.splitVisible = true;
  }
  
  onSplitConfirm(amount: number) {
    const inventoryId = this.inventoryState.getInventoryId();
    
    const itemDefinitionId =
      this.inventoryState.getItemDefinicitonId(this.selectedItem.uid);

    const command = InventoryCommandFactory.split(
      inventoryId,
      itemDefinitionId,
      this.selectedItem.uid,
      amount
    );

    this.inventoryFacade.InventoryAction(command);

    this.splitVisible = false;
  }

  onSplitClose() {
    this.splitVisible = false;
  }
}
