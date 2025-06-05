import { JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  allProjects: any[] = []
  allUsers: any[] = []
  newProject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  newUser: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  newTask: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})

  constructor() {
    const projects = localStorage.getItem('projects')
    projects ? this.allProjects = JSON.parse(projects) : []
    const users = localStorage.getItem('users')
    users ? this.allUsers = JSON.parse(users) : []

  }

  generateId() {
    const id: Date = new Date()
    return id.getTime()
  }

  onDeleteProject(id: number) {
    this.allProjects.forEach(item => {
      if (item['id'] === id) {
        const index = this.allProjects.indexOf(item)
        this.allProjects.splice(index, 1)
      }
    })
    localStorage.setItem('projects', JSON.stringify(this.allProjects))
  }

  getProjectbyId(id: number) {
    this.allProjects.forEach(item => {
      if (item['id'] == id) {
        return item
      }
    })
  }
}
