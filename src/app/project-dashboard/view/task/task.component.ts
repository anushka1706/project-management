import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'shared/data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @Input() allTasks !: any[]
  @Input() projectId !: number
  connectedDropLists: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.connectedDropLists = Object.keys(this.allTasks).map(key => this.getDropListId(key));
  }

  getDropListId(statusKey: string): string {
    return statusKey.split(' ').join('-').toLowerCase();
  }

  drop(event: CdkDragDrop<any[]>, statusKey: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const movedTask = event.container.data[event.currentIndex];
      if (movedTask) {
        movedTask.status = statusKey;

        this.dataService.changeTaskStatus(
          movedTask.taskId,
          statusKey,
          this.projectId
        );
      }
    }
  }

}