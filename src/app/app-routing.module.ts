import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { ShouldLoginGuard } from './authentication/should-login.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account'
  },
  {
    path: 'account',
    canLoad: [ShouldLoginGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'todo',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: false })
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
