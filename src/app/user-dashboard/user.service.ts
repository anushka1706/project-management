import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  roles: string[] = ["developer", "Project Manager", "QA", "Designer", "Team Lead"]
  
  constructor() { }
}
