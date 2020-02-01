import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PromptModule } from '@ngw/prompt';

import { TodoComponent } from './todo/todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoService } from './todo.service';
import { TodoMaterialModule } from './todo-material.module';
import { environment } from '../../environments/environment';
import { TODO_API_URL } from './todo.token';
import { DarkModeComponent } from '../dark-mode/dark-mode.component';

@NgModule({
  declarations: [TodoComponent, DarkModeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TodoRoutingModule,
    TodoMaterialModule,
    PromptModule
  ],
  providers: [
    TodoService,
    { provide: TODO_API_URL, useValue: environment.api }
  ]
})
export class TodoModule {}
