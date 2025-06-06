import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'shared/data.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  @Input() userDetails: { [key: string]: any } = {}
  tasks: number = 0

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.userDetails['task']?.length > 0) {
      this.tasks = this.userDetails['task'].length
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      disableClose: true,
      width: '400px',
      data: { user: this.userDetails }
    });
    dialogRef.afterClosed().subscribe(editData => {
      editData['id'] = this.userDetails['id']
      this.dataService.editUser.next(editData)
    })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: { name: this.userDetails['name'], type: 'User' }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.dataService.deleteUser(this.userDetails['id'])
      }
    });
  }
}
