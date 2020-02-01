import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin, zip, of } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';

import { PromptService } from '@ngw/prompt';
import { AuthenticationService } from '@ngw/authentication';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

type TodoViewMode = 'all' | 'completes' | 'actives';

interface TodoViewModel extends Todo {
  editMode: boolean;
}

function isEmptyOrSpaces(str): boolean {
  return str === null || str.match(/^ *$/) !== null;
}

@Component({
  selector: 'ngw-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('formAdd', { static: false }) formAdd: NgForm;

  todoViewMode: TodoViewMode = 'all';

  todos = new BehaviorSubject<TodoViewModel[]>([]);
  todos$ = this.todos.asObservable();
  completeTodos$ = this.todos.pipe(
    map(todos => todos.filter(todo => todo.done))
  );
  activeTodos$ = this.todos.pipe(
    map(todos => todos.filter(todo => {
      const todoDate = new Date(todo.date);
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      return todoDate > startOfToday && todoDate < endOfToday;
    }))
  );

  addFormGroup: FormGroup;
  editFormGroup: FormGroup;

  constructor(
    private todoService: TodoService,
    private promptService: PromptService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.addFormGroup = fb.group({
      title: ['']
    });
  }

  ngOnInit() {
    this.getAllTodos();
  }

  changeTodoViewMode(todoViewMode: TodoViewMode) {
    this.todoViewMode = todoViewMode;
  }

  getAllTodos(): void {
    this.todoService
      .getAll()
      .pipe(
        map(todos => todos.map(todo => ({...todo, editMode: false } as TodoViewModel)))
      )
      .subscribe(todos => this.todos.next(todos));
  }

  toggleTodoDone(event: MatCheckboxChange, todo: TodoViewModel): void {
    todo.done = event.checked;
    this.todoService
      .done(todo.id, todo)
      .subscribe(
        _ => this.doneTodo(todo, event.checked),
        err => todo.done = !todo.done
      );
  }

  private doneTodo(todo: TodoViewModel, done: boolean): void {
    todo.done = done;
    const todos = this.todos.value;
    this.todos.next([...todos]);
  }

  addTodo(valid, { title }): void {
    if (!valid || isEmptyOrSpaces(title)) {
      return;
    }

    const todo: Todo = {
      title,
      done: false,
      date: new Date()
    };

    this.todoService.add(todo).subscribe(
      addedTodo => {
        const todos = this.todos.value;
        const todoVM = { ...addedTodo, editMode: false } as TodoViewModel;
        this.todos.next([ ...todos, todoVM ]);

        this.formAdd.resetForm();
      }
    );
  }

  deleteTodo(todo: TodoViewModel): void {
    this.todoService.delete(todo.id).subscribe(
      _ => {
        const todos = this.todos.value;
        const todoIndex = todos.indexOf(todo);
        todos.splice(todoIndex, 1);

        this.todos.next([...todos]);
      }
    );
  }

  changeViewToEditTodo(todo: TodoViewModel): void {
    this.editFormGroup = this.fb.group({
      title: [todo.title, Validators.required]
    });
    todo.editMode = true;
  }

  editTodoTitle(valid: boolean, { title }, todo: TodoViewModel): void {
    if (!valid || isEmptyOrSpaces(title)) {
      return;
    }

    const editingTodo: Todo = {
      title,
      done: todo.done,
      date: todo.date,
      id: todo.id
    };

    this.todoService.changeTitle(todo.id, editingTodo).subscribe(
      _ => {
        todo.title = title;
        this.editFormGroup = null;
        this.changeViewToDisplayTodo(todo);
      }
    );
  }

  changeViewToDisplayTodo(todo: TodoViewModel): void {
    this.editFormGroup = null;
    todo.editMode = false;
  }

  promptToDeleteCompletedTodos(): void {
    this.promptService.prompt({
      message: 'Are you sure you want to delete all completed todos?',
      title: 'Delete all completed',
      buttons: [
        { content: 'Cancel', data: false, type: 'default', color: 'default', tabIndex: 2 },
        { content: 'Delete All', data: true, type: 'flat', color: 'warn', tabIndex: 1 },
      ]
    }).pipe(
      filter(prompted => prompted),
      switchMap(_ => this.completeTodos$),
      switchMap(completedTodos => {
        const jobsToDelete = completedTodos.map(todo => this.todoService.delete(todo.id));
        return zip(forkJoin(...jobsToDelete), of(completedTodos));
      })
    ).subscribe(
      ([_, deletedTodos]) => {
        deletedTodos.forEach(todo => {
          const todos = this.todos.value;
          const todoIndex = todos.indexOf(todo);
          todos.splice(todoIndex, 1);

          this.todos.next([...todos]);
        }
      );
    });
  }

  promptToLogout(): void {
    this.promptService.prompt({
      message: 'Do you want to logout?',
      title: 'Logout',
      buttons: [
        { content: 'Cancel', data: false, type: 'default', color: 'default', tabIndex: 2 },
        { content: 'Logout', data: true, type: 'flat', color: 'primary', tabIndex: 1 },
      ]
    }).pipe(
      filter(prompted => prompted),
      tap(_ => {
        this.authenticationService.logout();
      })
    ).subscribe();
  }
}
