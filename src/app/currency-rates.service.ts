import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { currencies } from './currencies';

@Injectable({
  providedIn: 'root',
})
export class CurrencyRatesService {
  private API_KEY = '5d274137288a27303858fe0a173d311c';
  private URL = 'http://api.currencylayer.com';

  private fetchRatesSubject = new Subject<void>();
  exchangeRates$: Observable<any>;
  constructor(private http: HttpClient) {
    this.exchangeRates$ = this.fetchRatesSubject.pipe(
      debounceTime(1000),
      switchMap(() => this.fetchExchangeRates())
    );
  }

  fetchExchangeRates(): Observable<any> {
    const url = `${this.URL}/live?access_key=${
      this.API_KEY
    }&currencies=${currencies.join(',')}&source=UAH`;
    return this.http.get(url).pipe(
      map((data: any) => {
        const baseCurrency = data.source;
        const quotes = data.quotes;

        const formattedRates: { [key: string]: number } = {};
        Object.keys(quotes).forEach((code) => {
          const pair = code.replace(baseCurrency, '');
          formattedRates[pair] = quotes[code];
        });
        return { ...formattedRates, UAH: 1 };
      })
    );
  }

  updateRates() {
    this.fetchRatesSubject.next();
  }
}
