import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private projectsService = inject(ProjectsService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    teamId: number = 0;
    project = signal<Project[] | null>(null);
    errorMessage: string | null = null;
    createProjectForm: FormGroup = this.fb.group({
      name: ['', Validators.required]
    });

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const teamIdParam = params.get('teamId');
        if (teamIdParam) {
          this.teamId = +teamIdParam;
          this.loadProjects();
        } else {
          // אם אין teamId, חזור לצוותים
          console.warn('No teamId provided');
          this.router.navigate(['/teams']);
        }
      });
    }

    loadProjects() {
      this.projectsService.getProjects().subscribe({
        next: (projects) => {
          const filtered = projects.filter(p => p.team_id === this.teamId);
          this.project.set(filtered);
        },
        error: (err: Error) => this.errorMessage = err.message
      });
    }
      
    onCreateProject() {
      if (this.createProjectForm.valid && this.teamId) {
        const name = this.createProjectForm.value.name;

        this.projectsService.createProject(name, this.teamId).subscribe({
          next: () => {
            this.loadProjects();
            this.createProjectForm.reset();
          },
          error: (err: Error) => this.errorMessage = err.message
        });
      }
    }
}
