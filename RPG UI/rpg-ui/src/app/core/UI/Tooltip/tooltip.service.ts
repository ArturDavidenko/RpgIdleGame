import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TooltipModel } from "./tooltip.models";
import { TooltipResolver } from "./tooltip.resolver";
import { InventoryItemView } from "../../inventory/models/Inventory-item.model";

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  model?: TooltipModel;
}

@Injectable({ providedIn: 'root' })
export class TooltipService {
  private isDragging = false;

  private stateSubject = new BehaviorSubject<TooltipState>({
    visible: false,
    x: 0,
    y: 0
  });

  state$ = this.stateSubject.asObservable();

  constructor(private resolver: TooltipResolver) {}

  show(item: InventoryItemView, event: MouseEvent) {
    if (this.isDragging) return;
    const model = this.resolver.resolve(item);

    this.stateSubject.next({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      model
    });
  }

  hide() {
    this.stateSubject.next({
      visible: false,
      x: 0,
      y: 0
    });
  }

  setDragging(value: boolean) {
    this.isDragging = value;

    if (value) {
      this.hide();
    }
  }
}