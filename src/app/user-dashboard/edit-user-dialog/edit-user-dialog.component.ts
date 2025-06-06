import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  editForm !: FormGroup
  options !: string[]
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private dataService: DataService,
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.user['name']],
      email: [this.data.user['email']],
      role: [this.data.user['role']]
    });
    this.options = this.userService.roles
  }
  onSubmit() {
    this.dialogRef.close(this.editForm.value)
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
