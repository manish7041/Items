import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Items } from '../models/itemsModel';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  url: string = 'http://localhost:3000/items';
  constructor(private http: HttpClient) {}

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  addItems(object: Items) {
    if (localStorage?.getItem('item')) {
      const previousValue = [
        ...JSON.parse(localStorage?.getItem('item')),
        object,
      ];
      localStorage.setItem('item', JSON.stringify(previousValue));
    } else {
      localStorage.setItem('item', JSON.stringify([object]));
    }
  }

  getItems() {
    this.getListItem();
  }

  deleteItems(object: Items) {
    const listData = this.getListItem();
    listData.forEach((element: any, index: number) => {
      if (element.id == object.id) {
        listData.splice(index, 1);
      }
    });
    localStorage.setItem('item', JSON.stringify(listData));
  }

  editItems(object: Items) {
    const listData = this.getListItem();
    listData.forEach((element: any, index: number) => {
      if (element.id == object.id) {
        listData.splice(index, 1, object);
      }
    });
    localStorage.setItem('item', JSON.stringify(listData));
  }
  getListItem() {
    const listData = JSON.parse(localStorage.getItem('item'));
    return listData;
  }
}
