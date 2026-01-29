import { Injectable,inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from 'rxjs';
import { Project } from "../models/project.model";
import { API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private apiUrl = `${API_URL}/api/projects`; 
  
  getProjects(){
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(error => throwError(() => new Error('שגיאה בקבלת רשימת הפרויקטים.')))
    );
  }

  createProject(name: string, teamId: number) {
    return this.http.post<Project>(this.apiUrl, { name, teamId }).pipe(
      catchError(error => throwError(() => new Error('שגיאה ביצירת פרויקט חדש.')))
    );
  }
}
