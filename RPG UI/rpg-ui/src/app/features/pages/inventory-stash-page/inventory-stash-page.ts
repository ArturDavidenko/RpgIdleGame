import { Component, HostListener } from '@angular/core';
import { StashInventoryComponent } from '../../../shared/components/stash-inventory-component/stash-inventory-component';

@Component({
  selector: 'app-inventory-stash-page',
  imports: [StashInventoryComponent],
  templateUrl: './inventory-stash-page.html',
  styleUrl: './inventory-stash-page.scss',
})
export class InventoryStashPage {
  pos = { x: 0, y: 0 };
  private dragging = false;
  private offset = { x: 0, y: 0 };

  startDrag(event: MouseEvent) {
    this.dragging = true;

    this.offset.x = event.clientX - this.pos.x;
    this.offset.y = event.clientY - this.pos.y;

    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    this.pos.x = event.clientX - this.offset.x;
    this.pos.y = event.clientY - this.offset.y;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }
}
