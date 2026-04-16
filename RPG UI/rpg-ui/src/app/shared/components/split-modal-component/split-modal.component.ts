import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-split-modal-component',
  imports: [NgIf],
  templateUrl: './split-modal.component.html',
  styleUrl: './split-modal.component.scss',
})
export class SplitModalComponent {
  @Input() item!: InventoryItemView;
  @Input() visible = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<number>();

  amount: number = 1;

  ngOnChanges() {
    if (this.item) {
      this.amount = 1;
    }
  }

  increment() {
    if (this.amount < this.item.quantity!) {
      this.amount++;
    }
  }

  decrement() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  onConfirm() {
    this.confirm.emit(this.amount);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
