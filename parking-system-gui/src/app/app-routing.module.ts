import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalListComponent } from './components/terminal/terminal-list/terminal-list.component';
import { TerminalDetailsComponent } from './components/terminal/terminal-details/terminal-details.component';
import { TerminalCreateComponent } from './components/terminal/terminal-create/terminal-create.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/terminals',
    pathMatch: 'full'
  },
  {
    path: 'terminals',
    component: TerminalListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'terminals/create',
    component: TerminalCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'terminals/:id',
    component: TerminalDetailsComponent,
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
