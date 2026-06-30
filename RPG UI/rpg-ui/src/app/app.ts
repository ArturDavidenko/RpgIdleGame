import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/pages/layout/header/header';
import { ItemTooltipComponent } from './shared/components/item-tooltip-component/item-tooltip-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ItemTooltipComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rpg-ui');
}
