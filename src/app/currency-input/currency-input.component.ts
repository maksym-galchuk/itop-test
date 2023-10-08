import { Component, Input, EventEmitter, Output } from '@angular/core';
import { currencies } from '../currencies';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent {
  @Input() label: string;
  @Input() disabled: boolean;

  @Input() selectedCurrency: string;
  @Output() selectedCurrencyChange = new EventEmitter<string>();

  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  protected readonly currencies = currencies;
}
