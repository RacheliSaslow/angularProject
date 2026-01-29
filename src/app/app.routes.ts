import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskComponent } from './components/task/task.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/:teamId/projects', component: ProjectListComponent },
  { path: 'teams/:teamId/projects/:projectId/tasks', component: TaskComponent },
  { path: 'teams/:teamId/projects/:projectId/tasks/:taskId/comments', component: CommentsComponent },
];
