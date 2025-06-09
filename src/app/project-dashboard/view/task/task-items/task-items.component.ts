import { Component, Input, OnInit } from '@angular/core';
import { EditTaskDialogComponent } from 'src/app/project-dashboard/edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';
import { ConfirmDeleteDialogComponent } from 'src/app/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-task-items',
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.scss']
})
export class TaskItemsComponent implements OnInit {
  @Input() task !: { [key: string]: any }
  @Input() projectId!: number
  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {

  }
  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      disableClose: true,
      width: '400px',
      data: { task: this.task }
    });
    dialogRef.afterClosed().subscribe(data => {
      data['taskId'] = this.task['taskId']
      this.dataService.editTask(this.projectId, data)
      const userTask = {
        taskId: this.task['taskId'],
        name: data['name'],
        status: data['status'],
        deadline: data['deadline']
      }
      this.dataService.updateUserTask(data['assignTo'].id, userTask, this.task['assignTo'].id)
    })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: { task: this.task, type: 'Task', name: this.task['name'] }
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.dataService.deleteTask(this.task['taskId'],this.projectId,this.task)
      }
    });
  }
}
