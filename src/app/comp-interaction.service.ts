import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Items } from './models/itemsModel';

@Injectable({
  providedIn: 'root',
})
export class CompInteractionService {
  constructor() {}

  submitAction: Subject<any> = new Subject<any>();
  FormData:Subject<any> = new Subject<any>()

  sendAction(value: string,object:Items) {
    console.log('s');
    
    this.submitAction.next([value,true,object]);
  }

  sendFormData(itemData:Items){
this.FormData.next(itemData)
  }
}
