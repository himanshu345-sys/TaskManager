import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus } from '../models/task-status';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService {

  constructor(private httpClient: HttpClient)
  {
  }

  getTaskStatuses(): Observable<TaskStatus[]>
  {
    return this.httpClient.get<TaskStatus[]>("/api/taskstatuses", { responseType: "json" });
  }

  insertTaskStatus(newTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.post<TaskStatus>("/api/taskstatuses", newTaskStatus, { responseType: "json" });
  }

  updateTaskStatus(existingTaskStatus: TaskStatus): Observable<TaskStatus>
  {
    return this.httpClient.put<TaskStatus>("/api/taskstatuses", existingTaskStatus, { responseType: "json" });
  }

  deleteTaskStatus(TaskStatusID: number): Observable<string>
  {
    return this.httpClient.delete<string>("/api/taskstatuses?TaskStatusID=" + TaskStatusID);
  }
}
