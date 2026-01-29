import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
  computed,
} from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { DialogService } from '../../services/dialog.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/team.model';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/login.service';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.css',
})
export class TeamsListComponent implements OnInit {
  TeamsService = inject(TeamsService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private dataService = inject(DataService);
  private dialogService = inject(DialogService);

  teams = this.TeamsService.teamsSignal();
  teamsList: Team[] = [];
  errorMessage: string | null = null;

  createTeamForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit() {
    this.TeamsService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teamsList = data;
        this.cdr.detectChanges();
        this.TeamsService.teamsSignal.set(data); // עדכון ידני של ה-Signal
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });
  }

  onCreateTeam() {
    if (this.createTeamForm.valid) {
      const teamName = this.createTeamForm.value.name;
      this.TeamsService.createTeam(this.createTeamForm.value.name).subscribe({
        next: (updatedTeams: any) => {
          this.teamsList = updatedTeams;
          this.cdr.detectChanges();
          this.TeamsService.teamsSignal.set(updatedTeams);
          this.createTeamForm.reset();
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

  addUser(teamId: number, userIdInput: string) {
    const userId = parseInt(userIdInput);
    if (!userId || !teamId) {
      this.errorMessage = 'יש להזין ID חוקי של משתמש.';
      return;
    }
    this.TeamsService.addUserToTeam(teamId, userId).subscribe({
      next: (updatedTeams: any) => {
        this.dialogService.open('המשתמש נוסף לצוות בהצלחה', 'info');
        this.TeamsService.teamsSignal.set(updatedTeams);
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });
  }

  userName = computed(
    () => this.dataService.currentUser()?.name || 'Guest',
  );
}
