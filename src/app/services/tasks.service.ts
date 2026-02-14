import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, throwError } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
    private http = inject(HttpClient);
    private apiUrl = `${API_URL}/api/tasks`;
    private commentsApiUrl = `${API_URL}/api/comments`;

    getTasks(projectId: number) {
        let params = new HttpParams().set('projectId', projectId.toString());
        return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
            catchError(error => throwError(() => new Error('שגיאה בקבלת המשימות.')))
        );
    }

    createTask(task: {title: string, description: string, projectId: number, status: string}) {
        return this.http.post<Task>(this.apiUrl, task).pipe(
            catchError(error => throwError(() => new Error('שגיאה ביצירת משימה חדשה.')))
        );
    }

    updateTaskStatus(taskId: number, status: string) {
        return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { status }).pipe(
            catchError(error => throwError(() => new Error('שגיאה בעדכון סטטוס המשימה.')))
        );
    }

    updateTaskPriority(taskId: number, priority: string) {
        return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, { priority }).pipe(
            catchError(error => throwError(() => new Error('שגיאה בעדכון עדיפות המשימה.')))
        );
    }

    deleteTask(taskId: number) {
        return this.http.delete(`${this.apiUrl}/${taskId}`).pipe(
            catchError(error => throwError(() => new Error('שגיאה במחיקת המשימה.')))
        );
    }
    
    getComments(taskId: number) {
        const params = new HttpParams().set('taskId', taskId.toString());
        return this.http.get<any[]>(this.commentsApiUrl, { params }).pipe(
            catchError(error => throwError(() => new Error('שגיאה בקבלת התגובות.')))
        );
    }

    createComment(taskId: number, content: string) {
        return this.http.post<any>(this.commentsApiUrl, { taskId, body: content }).pipe(
            catchError(error => throwError(() => new Error('שגיאה בשליחת התגובה.')))
        );
    }
}