import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskComponent } from './components/task/task.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'דף הבית' },
  { path: 'login', component: LoginComponent, title: 'התחברות' },
  { path: 'register', component: RegisterComponent, title: 'הרשמה' },
  { path: 'teams', component: TeamsListComponent, title: 'הצוותים שלי' },
  { path: 'teams/:teamId/projects', component: ProjectListComponent, title: 'פרויקטים' },
  { path: 'teams/:teamId/projects/:projectId/tasks', component: TaskComponent, title: 'משימות' },
  { path: 'teams/:teamId/projects/:projectId/tasks/:taskId/comments', component: CommentsComponent, title: 'תגובות' },
];
