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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private dataService: DataService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['']
    });
    this.options = this.userService.roles
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
}
