import { JsonpInterceptor } from '@angular/common/http';
import { CSP_NONCE, Injectable } from '@angular/core';
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
  editUser: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  newTask: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  viewProject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  isUpdatedUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  updatedUser: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([])

  constructor() {
    const projects = localStorage.getItem('projects')
    projects ? this.allProjects = JSON.parse(projects) : []
    const users = localStorage.getItem('users')
    users ? this.allUsers = JSON.parse(users) : []
    this.editUser.subscribe(data => {
      this.updateUser(data)
    })
    this.isUpdatedUsers.subscribe(value => {
      if (value) {
        const users = localStorage.getItem('users')
        users ? this.allUsers = JSON.parse(users) : []
        users ? this.updatedUser.next(JSON.parse(users)) : []
      }
    })
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
    const project = this.allProjects.find(project => project['id'] == id)
    this.viewProject.next(project)
  }

  updateUser(data: any) {
    this.allUsers.forEach(users => {
      if (users['id'] == data['id']) {
        users['name'] = data['name']
        users['email'] = data['email']
        users['role'] = data['role']
      }
    })
    localStorage.setItem('users', JSON.stringify(this.allUsers))
  }

  deleteUser(id: number) {
    this.allUsers.forEach(user => {
      if (user['id'] == id) {
        const index = this.allUsers.indexOf(user)
        this.allUsers.splice(index, 1)
      }
    })
    localStorage.setItem('users', JSON.stringify(this.allUsers))
  }

  addTasks(id: number, task: any) {
    const project = this.allProjects.find(projects => projects['id'] == id)
    const taskId = this.generateId()
    task['taskId'] = taskId
    project['tasks'].push(task)
    localStorage.setItem('projects', JSON.stringify(this.allProjects))
    const updated = this.allProjects.find(project => project['id'] == id)
    this.viewProject.next(updated)
    this.newTask.next(task)
  }

  addTaskToUser(userId: number, task: { [key: string]: any }) {
    const user = this.allUsers.find(user => user['id'] == userId)
    user['task'].push({
      taskId: task['taskId'],
      name: task['name'],
      status: task['status'],
      deadline: task['deadline']
    })
    localStorage.setItem('users', JSON.stringify(this.allUsers))
    // const updatedUser = this.allUsers.find(user => user['id'] == userId)
    this.isUpdatedUsers.next(true)
  }
}
