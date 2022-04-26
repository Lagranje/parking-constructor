import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalListComponent } from './components/terminal/terminal-list/terminal-list.component';
import { TerminalDetailsComponent } from './components/terminal/terminal-details/terminal-details.component';
import { TerminalCreateComponent } from './components/terminal/terminal-create/terminal-create.component';

const routes: Routes = [
  { path: '',   redirectTo: '/terminals', pathMatch: 'full' },
  { path: 'terminals', component: TerminalListComponent},
  { path: 'terminals/create', component: TerminalCreateComponent},
  { path: 'terminals/:id', component: TerminalDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
