import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectDialogComponent } from './new-project-dialog/new-project-dialog.component';
import { DataService } from 'shared/data.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  allProjects: any[] = []
  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    this.allProjects = this.dataService.allProjects
  }

  openDialog(): void {
    this.dialog.open(NewProjectDialogComponent, {
      disableClose: true,
      width: '400px'
    });
  }
}
