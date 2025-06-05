import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'shared/data.service';
import { Project } from 'shared/project.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id !: number
  project !: Project

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): any {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })
    const data = this.dataService.getProjectbyId(this.id)
    console.log(data)
  }
}

