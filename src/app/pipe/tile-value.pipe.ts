import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'tileValue'
})
export class TileValuePipe implements PipeTransform {
  constructor(private _currencyPipe: CurrencyPipe) { }
  transform(value: unknown, ...args: unknown[]): unknown {
    if(typeof value === 'number') {
      return this._currencyPipe.transform(value, 'USD', 'symbol', '1.0-0');
    }else{
      return value;
    }
  }

}
