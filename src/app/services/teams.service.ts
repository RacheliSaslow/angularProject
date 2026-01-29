import { inject, Injectable, signal } from "@angular/core";
import { switchMap, catchError, throwError } from "rxjs";
import { Team } from "../models/team.model";
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../api.config';

@Injectable({providedIn: 'root'})
export class TeamsService {
    private http = inject(HttpClient);
    private apiUrl = `${API_URL}/api/teams`;
    teamsSignal = signal<Team[]>([]);

    getTeams() {
        return this.http.get<Team[]>(this.apiUrl).pipe(
            catchError(error => throwError(() => new Error('שגיאה בקבלת רשימת הצוותים.')))
        );
    }

    createTeam(name: string) {
        return this.http.post<Team>(this.apiUrl, { name }).pipe(
            switchMap(() => this.getTeams()),
            catchError(error => throwError(() => new Error('שגיאה ביצירת צוות חדש.')))
        );
    }

    addUserToTeam(teamId: number, userId: number) {
        const url = `${this.apiUrl}/${teamId}/members`;
        return this.http.post(url, { userId }).pipe(
            switchMap(() => this.getTeams()),
            catchError(error => throwError(() => new Error('שגיאה בהוספת משתמש לצוות.')))
        );
    }
}