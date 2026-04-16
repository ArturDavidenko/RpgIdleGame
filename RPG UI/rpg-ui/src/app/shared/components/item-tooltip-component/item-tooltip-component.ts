import { Component } from '@angular/core';
import { TooltipService, TooltipState } from '../../../core/UI/Tooltip/tooltip.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-tooltip-component',
  imports: [CommonModule],
  templateUrl: './item-tooltip-component.html',
  styleUrl: './item-tooltip-component.scss',
})
export class ItemTooltipComponent {

  state$!: Observable<TooltipState>;

  constructor(private tooltipService: TooltipService) {
    this.state$ = this.tooltipService.state$;
  }

  
}
