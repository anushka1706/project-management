import { Component, OnInit } from '@angular/core';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  allUsers !: any[]

  ngOnInit(): void {
    this.allUsers = this.dataService.allUsers
  }

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  openDialog(): void {
    this.dialog.open(NewUserDialogComponent, {
      disableClose: true,
      width: '400px'
    });
  }
}
