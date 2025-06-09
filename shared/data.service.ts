import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  allProjects: any[] = []
  allUsers: any[] = []
  newProject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  newUser: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  editUser: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  newTask: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  viewProject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({})
  isUpdatedUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  updatedUser: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([])
  updatedTasks: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([])

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
    this.allUsers.forEach(user => {
      const taskIndex = user.task.indexOf((task: any) => task.projectId == id)
      user.task.splice(taskIndex, 1)
    })
    localStorage.setItem('users', JSON.stringify(this.allUsers))
    this.updatedUser.next(this.allUsers)
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
    this.allProjects.forEach(project => {
      for (let tasks of project.tasks) {
        if (tasks.assignTo.id == id) {
          tasks.assignTo = {}
        }
      }
    })
    localStorage.setItem('projects', JSON.stringify(this.allProjects))
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
    this.updatedTasks.next(updated['tasks'])
  }

  addTaskToUser(userId: number, task: { [key: string]: any }, projectId: number) {
    const user = this.allUsers.find(user => user['id'] == userId)
    user['task'].push({
      taskId: task['taskId'],
      name: task['name'],
      status: task['status'],
      deadline: task['deadline'],
      projectId: +projectId
    })
    localStorage.setItem('users', JSON.stringify(this.allUsers))
    this.isUpdatedUsers.next(true)
    this.newTask.next(true)
  }

  editTask(projectId: number, task: any) {
    const project = this.allProjects.find(project => project['id'] == projectId)
    const taskIndex = project?.['tasks'].findIndex((item: any) => item.taskId == task.taskId);
    if (taskIndex !== -1 && project) {
      project['tasks'][taskIndex] = task;
    }
    localStorage.setItem('projects', JSON.stringify(this.allProjects))
    this.viewProject.next(project)
  }
  editUserTask(task: any) {

  }
  updateUserTask(userId: number, task: any, assignedFrom: number) {
    const user = this.allUsers.find(user => user.id == userId)
    user['task'].push(task);
    const assignedFromUser = this.allUsers.find(user => user.id == assignedFrom)
    if (assignedFromUser) {
      const assignedFromTask = assignedFromUser?.['task'].findIndex((item: any) => item.taskId == task.taskId);
      assignedFromUser.task.splice(assignedFromTask, 1)
      console.log(this.allUsers)
    }
    localStorage.setItem('users', JSON.stringify(this.allUsers))
    this.isUpdatedUsers.next(true)
  }

  deleteTask(taskId: number, projectId: number) {
    this.allProjects.forEach(item => {
      const index = item.tasks.findIndex((task: any) => task.taskId == taskId)
      item.tasks.splice(index, 1)
    })
    this.allUsers.forEach(user => {
      const index = user.task.findIndex((task: any) => task.taskId == taskId)
      user.task.splice(index, 1)
    })
    const project = this.allProjects.find(project => project['id'] == projectId)
    localStorage.setItem('projects', JSON.stringify(this.allProjects))
    this.viewProject.next(project)
    localStorage.setItem('users', JSON.stringify(this.allUsers))
    this.isUpdatedUsers.next(true)
  }
changeTaskStatus(taskId: number, newStatus: string, projectId: number) {
  const project = this.allProjects.find(p => p.id === projectId);
  if (project) {
    const task = project.tasks.find((t: any) => t.taskId === taskId);
    if (task) {
      task.status = newStatus;
    }
  }
  this.allUsers.forEach(user => {
    const userTask = user.task.find((t: any) => t.taskId === taskId);
    if (userTask) {
      userTask.status = newStatus;
    }
  });
  localStorage.setItem('projects', JSON.stringify(this.allProjects));
  localStorage.setItem('users', JSON.stringify(this.allUsers));
  this.isUpdatedUsers.next(true);
}

}
