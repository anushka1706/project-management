import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  status: string[] = ["To Do", "In Progress", "Done"]
  constructor() { }
}
