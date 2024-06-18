import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompInteractionService } from './comp-interaction.service';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { UserItemsComponent } from './components/user-items/user-items.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [AppComponent, UserItemsComponent, AddItemsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    CompInteractionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
