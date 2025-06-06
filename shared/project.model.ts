export interface Project {
  name: string,
  description?: string,
  id?: number,
  startDate?: string,
  endDate?: string,
  tasks?: [{ [key: string]: any }]
}