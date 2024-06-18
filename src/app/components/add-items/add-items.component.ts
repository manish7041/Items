import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompInteractionService } from 'src/app/comp-interaction.service';
import { Items } from 'src/app/models/itemsModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  //properties
  itemData: Array<Items>;
  itemForm: FormGroup;
  lastItemId: any;

  //custom properties and customevent
  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() submitAction: string = '';
  @Input() selectedItem: Items;
  subscribeOne;
  subscribeTwo;

  dataService: DataServiceService = inject(DataServiceService);
  compInteractionService: CompInteractionService = inject(
    CompInteractionService
  );

  ngOnInit() {
    document.body.style.overflow = 'hidden';
    console.log('dddfdf');

    this.getData();
    //creating form
    this.itemForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });

    //to render value in fromtemplate
    this.itemForm.patchValue({
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      description: this.selectedItem.description,
    });
  }

  //methods
  // getData() {
  //   this.subscribeOne = this.dataService.getItems().subscribe((res) => {
  //     this.itemData = res;
  //     // console.log(this.itemData);
  //     this.getItemLastId();
  //     this.subscribeOne.unsubscribe();
  //   });
  // }
  getData() {
    this.itemData = this.dataService.getListItem();
    console.log(this.itemData);
  }

  addItem() {
    const listData = JSON.parse(localStorage.getItem('item'));
    if (listData?.length) {
      this.lastItemId = listData[listData.length - 1].id;
    } else {
      this.lastItemId = 0;
    }

    if (this.submitAction === 'Add' && this.lastItemId != undefined) {
      this.itemForm.patchValue({
        id: Number(this.lastItemId) ? 0 : Number(this.lastItemId) + 1,
      });

      // console.log(this.itemForm.value);
      this.subscribeOne = this.dataService.addItems(this.itemForm.value);
      this.dataService.emitChange('Some change data');

      // this.compInteractionService.sendFormData(this.itemData);
    } else if (this.submitAction === 'Update') {
      this.lastItemId = this.selectedItem?.id;
      this.subscribeOne = this.dataService.editItems(this.itemForm.value);
      this.dataService.emitChange('Some change data');
      // this.compInteractionService.sendFormData(this.itemForm.value);
    }

    this.closeAddItem();
  }

  closeAddItem() {
    this.close.emit(false);
    this.itemForm.reset();
    document.body.style.overflow = '';
  }

  getItemLastId() {
    let [lastItem] = this.itemData.splice(this.itemData.length - 1, 1);
    this.lastItemId = Number(lastItem.id);
    // console.log(this.lastItemId);
  }
}
