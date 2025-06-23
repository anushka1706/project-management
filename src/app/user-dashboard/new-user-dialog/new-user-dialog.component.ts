import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  form !: FormGroup
  options !: string[]
  nameErrorMessage: String = ''
  nameError: boolean = false
  emailErrorMessage: string = ''
  emailError: boolean = false
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private dataService: DataService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['']
    });
    this.options = this.userService.roles
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSubmit() {
    const data = {
      name: this.form.value.name,
      email: this.form.value.email,
      role: this.form.value.role,
      id: this.dataService.generateId(),
      task: []
    }
    this.updateNewUser(data)
  }

  updateNewUser(data: any) {
    this.dataService.newUser.next(data)
    this.dataService.allUsers.push(data)
    localStorage.setItem("users", JSON.stringify(this.dataService.allUsers))
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
  checkIfValidEmail(e: Event) {
    if (this.form.get('email')?.invalid) {
      this.emailError = true
      this.emailErrorMessage = 'Please enter valid email'
    } else {
      this.emailError = false
      this.emailErrorMessage = ''
    }
  }
}
