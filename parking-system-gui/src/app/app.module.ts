import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ApiModule } from './services/api/parking-system/parking-system.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { TerminalListComponent } from './components/terminal/terminal-list/terminal-list.component';
import { TerminalGridComponent } from './components/terminal/terminal-list/terminal-grid/terminal-grid.component';
import { TerminalActionsComponent } from './components/terminal/terminal-list/terminal-actions/terminal-actions.component';
import { TerminalDetailsComponent } from './components/terminal/terminal-details/terminal-details.component';
import { TerminalCreateComponent } from './components/terminal/terminal-create/terminal-create.component';
import { TerminalConstructorComponent } from './components/terminal/terminal-create/terminal-constructor/terminal-constructor.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";

import "./components/terminal/terminal-create/terminal-constructor/fabric-modules/parking-place.subclass";
import "./components/terminal/terminal-create/terminal-constructor/fabric-modules/grid.subclass";
import "./components/terminal/terminal-create/terminal-constructor/fabric-modules/beacon.subclass";

@NgModule({
  declarations: [
    AppComponent,
    TerminalListComponent,
    TerminalActionsComponent,
    TerminalGridComponent,
    TerminalDetailsComponent,
    TerminalCreateComponent,
    TerminalConstructorComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ApiModule.forRoot({rootUrl: environment.api.parkingSystem}),
    FontAwesomeModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
