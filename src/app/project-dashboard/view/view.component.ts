import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'shared/data.service';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id !: number
  project: { [key: string]: any } = {}
  allTasks: any[] = []
  tasks: number = 0
  status: any[] = []
  constructor(private route: ActivatedRoute, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): any {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })
    this.dataService.getProjectbyId(this.id)
    this.dataService.viewProject.subscribe(data => {
      this.project = data
      this.tasks = this.project?.['tasks'].length > 0 ? this.project?.['tasks'].length : 0
      this.allTasks = this.project['tasks']
      this.creatTaskGroup()
    })
  }

  creatTaskGroup() {
    this.status = []
    this.allTasks.forEach(tasks => {
      if (!this.status[tasks.status]) {
        this.status[tasks.status] = []
      }
      this.status[tasks.status].push(tasks)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      disableClose: true,
      width: '400px',
      data: { allUsers: this.dataService.allUsers }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataService.addTasks(this.project?.['id'], data)
        this.dataService.addTaskToUser(data.assignTo.id, data,this.id)
        this.creatTaskGroup()
      }
    })
  }
}

