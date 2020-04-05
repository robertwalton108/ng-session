import { Injectable } from '@angular/core';

//much more but have behaviour of "type"
export interface TodoEntity {
    title: string
    isCompleted: boolean
}

//shape for the service
@Injectable({
    providedIn: null,

})
export class TodoStoreService {
    todoList: TodoEntity[] = [
        {
            title: "Finish the task",
            isCompleted: false
        },
        {
            title: "Finish the task1",
            isCompleted: true
        },
    ];

    add(title: string) {
        this.todoList.push({
            title: title,
            isCompleted: false,
        })
    }

    update(updatedIndex: number, isChecked: boolean) {
        this.todoList.forEach((item, idx) => {
            if (updatedIndex === idx) {
                item.isCompleted = isChecked
            }
        })
    }

    updateIsChecked(updatedIndex: number, isChecked: boolean) {
        this.todoList[updatedIndex].isCompleted = isChecked
    }

    removeAll() {
        this.todoList.forEach((item, idx) => {
            this.todoList.splice(idx)
        })
    }

    removeDone() {
        this.todoList.forEach((item, idx) => {
            if (item.isCompleted === true) {
                this.todoList.splice(idx)
            }
        })
    }

    remove(idx: number) {
        this.todoList.splice(idx)
    }

}

//event loop: matain all the data inside the serivce and component.
//rerender if some change.
//everytime the data related to the template is changed, event
//loop will auto render it
