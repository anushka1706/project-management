import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-project-items',
  templateUrl: './project-items.component.html',
  styleUrls: ['./project-items.component.scss']
})
export class ProjectItemsComponent implements OnInit {
  @Input() projectDetails: { [key: string]: any } = {}
  tasks: number = 0

  constructor(private route: Router, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectDetails['tasks']?.length > 0 ? this.tasks = this.projectDetails['tasks'].length : 0
  }

  onView() {
    this.route.navigate(['view'], {
      queryParams: {
        id: this.projectDetails['id']
      }
    }
    )
  }
  openDeleteDialog(e: Event) {
    e.stopPropagation()
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: { name: this.projectDetails['name'], type: 'Project' }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.dataService.onDeleteProject(this.projectDetails['id'])
      }
    });
  }
}

