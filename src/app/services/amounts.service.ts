import { Injectable } from '@angular/core';
import { Amounts } from './amounts.model';

@Injectable({
  providedIn: 'root'
})
export class AmountsService {

private _amounts: Amounts[] = [];

get amounts() {
  return [...this._amounts];
}

constructor() {

}

public addAmount(amount: Amounts){
  this._amounts.push(amount)
}

}

