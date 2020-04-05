import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, TodoInputComponent, TodoListComponent,TodoItemCompleteInputCheckbox,TodoItemRemoveAll,TodoListDoneComponent, TodoListNotDoneComponent} from './app.component';
import { TodoStoreService } from './todo-store.service';

@NgModule({
  //view
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoItemCompleteInputCheckbox,
    TodoItemRemoveAll,
    TodoListDoneComponent,
    TodoListNotDoneComponent,
  ],

  
  imports: [
    BrowserModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  //maybe bussiness logic
  providers: [
    TodoStoreService
  ],
  
  //what component will be render it first
  bootstrap: [AppComponent]
})
export class AppModule { }

