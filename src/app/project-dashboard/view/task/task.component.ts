import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() allTasks !: any[]
  status: { [key: string]: any } = {}

  ngOnInit(): void {
    this.creatTaskGroup()
  }

  creatTaskGroup() {
    this.allTasks.forEach(tasks => {
      if (!this.status[tasks.status]) {
        this.status[tasks.status] = []
      }
      this.status[tasks.status].push(tasks)
    })
  }

  tranformString(name: string) {
    const split: string[] = name.split(" ")
    return split.join("-")
  }
}
