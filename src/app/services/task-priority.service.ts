import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskPriority } from '../models/task-priority';

@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

  constructor(private httpClient: HttpClient) 
  { 

  }

  getTaskPriority(): Observable<TaskPriority[]>
  {
    return this.httpClient.get<TaskPriority[]>("/api/taskpriorities",{responseType:"json"});
  }

  insertTaskPriority(newTaskPriority:TaskPriority):Observable<TaskPriority>
  {
    return this.httpClient.post<TaskPriority>("/api/taskpriorities",newTaskPriority,{responseType:"json"});
  }

  updateTaskPriority(existingTaskPriority:TaskPriority):Observable<TaskPriority>
  {
    return this.httpClient.put<TaskPriority>("/api/taskpriorities",existingTaskPriority,{responseType:"json"});
  }

  deleteTaskPriority(TaskPriorityID: number):Observable<string>
  {
    return this.httpClient.delete<string>("/api/taskpriorities?TaskPriorityID=" + TaskPriorityID);
  }
}
