import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectService } from './project-dashboard/project.service';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectItemsComponent } from './project-dashboard/project-items/project-items.component';
import { NewProjectDialogComponent } from './project-dashboard/new-project-dialog/new-project-dialog.component';
import { EditProjectDialogComponent } from './project-dashboard/edit-project-dialog/edit-project-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { NewUserDialogComponent } from './user-dashboard/new-user-dialog/new-user-dialog.component';
import { ViewComponent } from './project-dashboard/view/view.component';
import { EditUserDialogComponent } from './user-dashboard/edit-user-dialog/edit-user-dialog.component';
import { UserItemsComponent } from './user-dashboard/user-items/user-items.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { NewTaskDialogComponent } from './project-dashboard/new-task-dialog/new-task-dialog.component';
import { EditTaskDialogComponent } from './project-dashboard/edit-task-dialog/edit-task-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './project-dashboard/view/task/task.component';
import { TaskItemsComponent } from './project-dashboard/view/task/task-items/task-items.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    UserDashboardComponent,
    ProjectItemsComponent,
    NewProjectDialogComponent,
    EditProjectDialogComponent,
    NewUserDialogComponent,
    EditUserDialogComponent,
    UserItemsComponent,
    ConfirmDeleteDialogComponent,
    NewTaskDialogComponent,
    EditTaskDialogComponent,
    ViewComponent,
    TaskComponent,
    TaskItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
