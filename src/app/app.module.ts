import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateDialogComponent } from './todo/create-dialog/create-dialog.component'
import { MaterialModule } from './shared/material.module';
import { CheckboxPipePipe } from './todo/checkbox-pipe.pipe';
import { EditDialogComponent } from './todo/edit-dialog/edit-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    CreateDialogComponent,
    CheckboxPipePipe,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'todo', component: TodoComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }