import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TaskComponent } from './project-dashboard/task/task.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectItemsComponent } from './project-dashboard/project-items/project-items.component';
import { NewProjectDialogComponent } from './project-dashboard/new-project-dialog/new-project-dialog.component';
import { EditProjectDialogComponent } from './project-dashboard/edit-project-dialog/edit-project-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { NewUserDialogComponent } from './user-dashboard/new-user-dialog/new-user-dialog.component';
import { EditUserDialogComponent } from './user-dashboard/edit-user-dialog/edit-user-dialog.component';
import { UserItemsComponent } from './user-dashboard/user-items/user-items.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    UserDashboardComponent,
    TaskComponent,
    ProjectItemsComponent,
    NewProjectDialogComponent,
    EditProjectDialogComponent,
    NewUserDialogComponent,
    EditUserDialogComponent,
    UserItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
