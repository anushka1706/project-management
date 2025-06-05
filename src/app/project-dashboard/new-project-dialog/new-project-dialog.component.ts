import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'shared/data.service';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss']
})

export class NewProjectDialogComponent implements OnInit {
  form !: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewProjectDialogComponent>,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    const data = {
      name: this.form.value.name,
      description: this.form.value.description,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      id: this.dataService.generateId(),
      task: []
    }
    this.updateNewProject(data)
  }

  updateNewProject(data: any) {
    this.dataService.newProject.next(data)
    this.dataService.allProjects.push(data)
    localStorage.setItem("projects", JSON.stringify(this.dataService.allProjects))
  }
}
