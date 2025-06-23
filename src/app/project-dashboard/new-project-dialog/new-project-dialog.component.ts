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
  nameErrorMessage !: string
  nameError: boolean = false
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
      tasks: []
    }
    this.updateNewProject(data)
  }

  updateNewProject(data: any) {
    this.dataService.newProject.next(data)
    this.dataService.allProjects.push(data)
    localStorage.setItem("projects", JSON.stringify(this.dataService.allProjects))
  }
  checkIfValid(e: Event) {
    const input = e.target as HTMLInputElement;
    const valueStr = input.value.trim();
    if (valueStr.length < 3 && valueStr.length > 0) {
      this.nameError = true
      this.nameErrorMessage = 'Name should be minimum 3 characters'
    }
    else {
      this.nameError = false
      this.nameErrorMessage = ''
    }
  }
}
