import { Component } from '@angular/core';
import { InventoryGridComponent } from '../inventory-grid-component/inventory-grid-component';

@Component({
  selector: 'app-test-component',
  imports: [InventoryGridComponent],
  templateUrl: './test-component.html',
  styleUrl: './test-component.scss',
})
export class TestComponent {



  onCellClick(cell: {x: number, y: number}) {
    console.log('Clicked cell:', cell);
  }

  onCellHover(cell: {x: number, y: number}) {
    console.log('Hover cell:', cell);
  }
}
