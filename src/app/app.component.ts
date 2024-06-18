import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { CompInteractionService } from './comp-interaction.service';
import { Items } from './models/itemsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  openAddItem: boolean = false;
  selectedI: Items;
  formAction: string;
  compInteractionService: CompInteractionService = inject(
    CompInteractionService
  );

  unsub: any;

  ngOnInit() {
    this.unsub = this.compInteractionService.submitAction.subscribe({
      next: (res) => {
        let [s, b, o] = res;
        this.openAddItem = b;
        this.selectedI = o;
        this.formAction = s;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddItem() {
    this.openAddItem = true;
    this.formAction = 'Add';
    this.selectedI = { id: null, name: '', description: '' };
  }

  closeAddItem(value: boolean) {
    this.openAddItem = value;
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }
}
