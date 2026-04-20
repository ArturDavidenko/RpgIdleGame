import { NgFor, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItemView } from '../../../core/inventory/models/Inventory-item.model';

export type GridCell = {
  x: number;
  y: number;
};

@Component({
  selector: 'app-inventory-grid-component',
  imports: [NgFor, NgStyle],
  templateUrl: './inventory-grid-component.html',
  styleUrl: './inventory-grid-component.scss',
})
export class InventoryGridComponent {
  @Input({ required: true }) cols!: number;
  @Input({ required: true }) rows!: number;

  @Input() cellTexture: string = 'assets/InventoryImages/Cell.png';

  readonly cellSize = 32;
  cells: GridCell[] = [];
  
  @Input() hoverCell: GridCell | null = null;
  @Input() hoverValid: boolean = false;
  @Input() draggedItem: InventoryItemView | null = null;

  @Output() cellHover = new EventEmitter<GridCell>();
  @Output() cellClick = new EventEmitter<GridCell>();
  @Output() cellEnter = new EventEmitter<GridCell>();

  ngOnChanges() {
    this.generateCells();
  }

  get gridStyles() {
    return {
      width: `${this.cols * this.cellSize}px`,
      height: `${this.rows * this.cellSize}px`,
      display: 'grid',
      gridTemplateColumns: `repeat(${this.cols}, ${this.cellSize}px)`,
      gridTemplateRows: `repeat(${this.rows}, ${this.cellSize}px)`
    };
  }

  private generateCells() {
    const result: GridCell[] = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        result.push({ x, y });
      }
    }

    this.cells = result;
  }

  onHover(cell: GridCell) {
    this.cellHover.emit(cell);
  }

  onClick(cell: GridCell) {
    this.cellClick.emit(cell);
  }

  onEnter(cell: GridCell) {
    this.cellEnter.emit(cell);
  }

  isInHoverArea(x: number, y: number): boolean {
    if (!this.hoverCell || !this.draggedItem) return false;
    
    return x >= this.hoverCell.x && 
          x < this.hoverCell.x + this.draggedItem.width &&
          y >= this.hoverCell.y && 
          y < this.hoverCell.y + this.draggedItem.height;
  }
}
