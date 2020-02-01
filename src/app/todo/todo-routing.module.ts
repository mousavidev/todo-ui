import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: TodoComponent
          }
        ])
    ],
    exports: [RouterModule],
})
export class TodoRoutingModule {}
