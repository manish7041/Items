import { Component, DoCheck, OnDestroy, OnInit, inject } from '@angular/core';
import { CompInteractionService } from 'src/app/comp-interaction.service';
import { Items } from 'src/app/models/itemsModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css'],
})
export class UserItemsComponent implements OnInit, OnDestroy {
  //services
  dataService: DataServiceService = inject(DataServiceService);
  compInteractionService: CompInteractionService = inject(
    CompInteractionService
  );
  //properties
  itemsList: Array<Items>;
  selectedItem: Items;
  subscribeOne;
  subscribeTwo;

  ngOnInit() {
    this.getData();
    this.dataService.changeEmitted$.subscribe((change) => {
      this.getData();
    });
  }
  changeSomething() {}
  getData() {
    this.itemsList = this.dataService.getListItem();
    if (!this.itemsList || this.itemsList.length < 1) {
      this.itemsList = null;
    }
  }

  editItem(object: Items) {
    this.compInteractionService.sendAction('Update', object);
  }

  deleteItem(object: Items) {
    this.subscribeOne = this.dataService.deleteItems(object);
    this.dataService.emitChange('Some change data');
  }

  ngOnDestroy() {
    this.subscribeOne.unsubscribe();
    this.subscribeTwo.unsubscribe();
  }
}
