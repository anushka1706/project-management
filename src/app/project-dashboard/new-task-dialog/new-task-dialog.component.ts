import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/user-dashboard/user.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent implements OnInit {
  form !: FormGroup
  status !: string[]
  selectedUsers: { [key: string]: any } = {}
  filteredUsers !: any[]
  nameErrorMessage: string = ''
  nameError: boolean = false
  noUserError: boolean = false
  noUserMessage !: string

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTaskDialogComponent>,
    private dataService: DataService,
    private userService: UserServiceService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { allUsers: any[] }
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: [''],
      assignTo: [''],
      deadline: ['']
    });
    this.status = this.projectService.status
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value)
  }
  cancel(e: Event) {
    e.stopPropagation()
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
      this.filteredUsers = this.data.allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      if (!this.filteredUsers.length || !this.form.get('assignTo')) {
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
