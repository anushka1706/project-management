import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'shared/data.service';

@Component({
  selector: 'app-project-items',
  templateUrl: './project-items.component.html',
  styleUrls: ['./project-items.component.scss']
})
export class ProjectItemsComponent implements OnInit {
  @Input() projectDetails: { [key: string]: any } = {}
  tasks: number = 0
  
  constructor(private route: Router, private dataService: DataService) { }

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
  onDelete() {
    this.dataService.onDeleteProject(this.projectDetails['id'])
  }
}

