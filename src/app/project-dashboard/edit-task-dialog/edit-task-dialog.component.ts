import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/user-dashboard/user.service';
import { ProjectService } from '../project.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})

export class EditTaskDialogComponent implements OnInit {
  editform !: FormGroup
  status !: string[]
  selectedUsers: { [key: string]: any } = {}
  filteredUsers !: any[]
  noUserError: boolean = false
  noUserMessage: string = ''
  nameErrorMessage: string = ''
  nameError: boolean = false

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    private dataService: DataService,
    private dialog: MatDialog,
    private userService: UserServiceService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { task: any }
  ) { }

  ngOnInit(): void {
    this.editform = this.fb.group({
      name: [this.data.task['name'], Validators.required],
      description: [this.data.task['description'], Validators.required],
      status: [this.data.task['status']],
      assignTo: [this.data.task['assignTo']],
      deadline: [this.data.task['deadline']]
    });
    this.status = this.projectService.status
  }

  onSubmit() {
    this.dialogRef.close(this.editform.value)
  }

  cancel() {
    this.dialogRef.close()
  }

  filterUsers(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    if (query.length <= 0) {
      this.filteredUsers = [];
      this.noUserError = true
      this.noUserMessage = 'Please enter a username'
    } else {
      this.noUserError = false
      this.noUserMessage = ''
      this.filteredUsers = this.dataService.allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      if (!this.filteredUsers.length || !this.editform.get('assignTo')) {
        this.noUserError = true;
        this.noUserMessage = 'No user found';
      } else {
        this.noUserError = false
        this.noUserMessage = ''
      }
    }
  }

  onUserSelected(user: any[]) {
    this.selectedUsers = user
  }

  displayUser(user: any): string {
    return user ? user.name : '';
  }
  checkIfValid(e: Event) {
    const input = e.target as HTMLInputElement;
    const valueStr = input.value.trim();
    if (valueStr.length < 3 && valueStr.length > 0) {
      this.nameError = true
      this.nameErrorMessage = 'Name should be minimum 3 characters'
    }
    else {
      this.nameError = false
      this.nameErrorMessage = ''
    }
  }
}
