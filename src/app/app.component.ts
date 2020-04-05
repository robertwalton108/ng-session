import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TodoStoreService } from './todo-store.service';
import { TodoEntity } from './todo-store.service';

//() event listener
@Component({
    template: `
       <input
       #todoTitleInputElement
       (keydown.enter)="handleKeyPress()"
       placeholder="Type something..." />
    `,
    selector: 'app-todo-input'
})
export class TodoInputComponent {

    @ViewChild('todoTitleInputElement')
    todoTitleInputElement: ElementRef<HTMLInputElement>

    handleKeyPress() {
        const todoTitle = this.todoTitleInputElement.nativeElement.value
        this.todoStoreService.add(todoTitle)
        this.todoTitleInputElement.nativeElement.value = ""
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) {

    }
}

@Component({
    template: `
     <input type="checkbox" [checked]=isChecked (click)='handleClick()'/>
    `,
    selector: 'todo-check-box'
})

export class TodoItemCompleteInputCheckbox {

    @Input()
    isChecked = false

    @Output()
    check = new EventEmitter<boolean>();

    handleClick() {
        console.log("check box is clicked")
        this.check.next(!this.isChecked)
    }
}

@Component({
    template: `
    <button (click)="onDeleteAll()" 
    [disabled]="(todoList.length === 0)">Delete All</button>
    `,
    selector: 'app-todo-button'
})
export class TodoItemRemoveAll {
    onDeleteAll() {
        console.log("button is clicked")
        this.todoStoreService.removeAll()
    }

    get todoList(): TodoEntity[] {
        return this.todoStoreService.todoList;
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) {

    }
}

@Component({
    template: `
    <div>Count = {{lengthTodoList}}</div>
    <ul>
    <li aria-label="time" *ngFor="let todo of todoList; let i = index">
       <todo-check-box 
            (check) = "handleCheck(i, $event)"
            [isChecked] = 'todo.isCompleted'>
       </todo-check-box>
        <span *ngIf="todo.isCompleted" style="text-decoration: line-through;">
            {{todo.title}}
            <button (click)="onDelete(i)">Delete</button>
        </span>
        <span *ngIf="!todo.isCompleted">
            {{todo.title}}
            <button (click)="onDelete(i)">Delete</button>
        </span>
    </li>
</ul>
`,
    selector: 'app-todo-list'
})
export class TodoListComponent {

    get todoList(): TodoEntity[] {
        return this.todoStoreService.todoList;
    }

    get lengthTodoList(): number {
        return this.todoStoreService.todoList.length
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) {

    }

    handleCheck(idx: number, event: boolean) {
        this.todoStoreService.updateIsChecked(idx, event)
        console.log("mouse is check", event)
    }

    onDelete(i: number) {
        this.todoStoreService.remove(i)
    }
}


@Component({
    template: `
    <div>Count = {{lengthDone}}</div>
    <ul>
    <li aria-label="time" *ngFor="let todo of todoList">
        <span *ngIf="todo.isCompleted" style="text-decoration: line-through;">
            {{todo.title}}
        </span>
    </li>
</ul>
`,
    selector: 'app-todo-done-list'
})
export class TodoListDoneComponent {

    get todoList(): TodoEntity[] {
        return this.todoStoreService.todoList;
    }

    get lengthDone(): number {
        let i = 0
        this.todoStoreService.todoList.forEach(todo => {
            if (todo.isCompleted === true) {
                i++
            }
        });
        return i
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) {

    }
}

@Component({
    template: `
    <div>Count = {{lengthNotDone}}</div>
    <ul>
    <li aria-label="time" *ngFor="let todo of todoList">
        <span *ngIf="!todo.isCompleted">
            {{todo.title}}
        </span>
    </li>
</ul>
`,
    selector: 'app-todo-notdone-list'
})
export class TodoListNotDoneComponent {

    get todoList(): TodoEntity[] {
        return this.todoStoreService.todoList;
    }

    get lengthNotDone(): number {
        let i = 0
        this.todoStoreService.todoList.forEach(todo => {
            if (todo.isCompleted === false) {
                i++
            }
        });
        return i
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) {

    }
}


@Component({
    template: `
        <div>
            {{name}}
        </div>
        <mat-tab-group>
            <mat-tab label="All todos">             
                <app-todo-input></app-todo-input>
                <app-todo-list></app-todo-list>
                <app-todo-button></app-todo-button> 
            </mat-tab>
            <mat-tab label="Checked todos"> 
                <app-todo-done-list></app-todo-done-list>
            </mat-tab>
            <mat-tab label="Still todos"> 
                <app-todo-notdone-list></app-todo-notdone-list>
            </mat-tab>
        </mat-tab-group>
    `,
    selector: 'app-root',
})
export class AppComponent {
    public name = 'Todo Application with Angular 9'

}