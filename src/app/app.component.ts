import { Component } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rates: { [key: string]: number };
  isLoading: boolean = true;
  currencyFrom: string = 'UAH';
  currencyTo: string = 'EUR';
  valueFrom: number = 0;
  valueTo: number = 0;

  constructor(private CurrencyRatesService: CurrencyRatesService) {
    this.CurrencyRatesService.exchangeRates$.subscribe((rates) => {
      this.rates = rates;
      this.isLoading = false;
    });
    this.CurrencyRatesService.updateRates();
  }

  reconvert() {
    this.valueTo = this.convert(
      this.valueFrom,
      this.currencyFrom,
      this.currencyTo
    );
  }

  changeCurrencyFrom(currency: string) {
    if (currency === this.currencyTo) {
      this.currencyTo = this.currencyFrom;
    }
    this.currencyFrom = currency;
    this.reconvert();
  }
  changeCurrencyTo(currency: string) {
    if (currency === this.currencyFrom) {
      this.currencyFrom = this.currencyTo;
    }
    this.currencyTo = currency;
    this.reconvert();
  }
  changeValueFrom(value: number) {
    this.CurrencyRatesService.updateRates();
    this.valueFrom = value;
    this.valueTo = this.convert(value, this.currencyFrom, this.currencyTo);
  }
  changeValueTo(value: number) {
    this.CurrencyRatesService.updateRates();
    this.valueTo = value;
    this.valueFrom = this.convert(value, this.currencyTo, this.currencyFrom);
  }

  convert(amount: number, from: string, to: string): number {
    return +((amount * this.rates[to]) / this.rates[from]).toFixed(2);
  }
}
