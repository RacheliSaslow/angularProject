import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { DialogService } from '../../services/dialog.service';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommentsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  private dialogService = inject(DialogService);

  private fb = inject(FormBuilder);

  projectId: number = 0;
  teamId: number = 0;
  tasks = signal<Task[] | null>(null);
  errorMessage: string | null = null;
  searchTerm = signal('');

  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const term = this.searchTerm().toLowerCase();
    if (!tasks) return null;
    return tasks.filter(task => task.title.toLowerCase().includes(term));
  });

  createTaskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['Medium', Validators.required]
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('projectId')!;
      this.teamId = +params.get('teamId')!;
      this.loadTasks();
    });
  }

  loadTasks() {
    this.tasksService.getTasks(this.projectId).subscribe({
      next: (data) => {
        this.tasks.set(data);
      },
      error: (err: Error) => this.errorMessage = err.message
    });
  }
  
  onCreateTask() {
    if (this.createTaskForm.valid) {
      const newTask = {
        title: this.createTaskForm.value.title,
        description: this.createTaskForm.value.description,
        priority: this.createTaskForm.value.priority,
        projectId: this.projectId,
        status: 'ToDo'
      };
      this.tasksService.createTask(newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.createTaskForm.reset();
        },
        error: (err: Error) => this.errorMessage = err.message
      });
    }
  }

  updateTaskStatus(taskId: number, newStatus: string) {
    this.tasksService.updateTaskStatus(taskId, newStatus).subscribe({
      next: () => this.loadTasks(),
      error: (err: Error) => this.errorMessage = err.message
    });
  }

  deleteTask(taskId: number) {
    this.dialogService.open('האם אתה בטוח שברצונך למחוק את המשימה?');
    this.dialogService.confirmation$.pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.tasksService.deleteTask(taskId).subscribe({
          next: () => this.loadTasks(),
          error: (err: Error) => this.errorMessage = err.message
        });
      }
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  getTasksByStatus(status: string){
    const tasks = this.filteredTasks();
    return tasks ? tasks.filter(task => task.status === status) : [];
  }

   selectedTaskId: number | null = null; // משימה שנבחרה להצגת תגובות
  editingTaskId: number | null = null; // משימה שנמצאת במצב עריכה

  startEditing(taskId: number) {
    this.editingTaskId = taskId;
  }

  cancelEditing() {
    this.editingTaskId = null;
  }

  updateTaskPriority(taskId: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newPriority = selectElement.value;
    this.tasksService.updateTaskPriority(taskId, newPriority).subscribe({
      next: () => {
        this.loadTasks();
        this.editingTaskId = null;
      },
      error: (err: Error) => this.errorMessage = err.message
    });
  }

  toggleComments(taskId: number) {
    if (this.selectedTaskId === taskId) {
      this.selectedTaskId = null; // סגירה אם כבר פתוח
    } else {
      this.selectedTaskId = taskId; // פתיחה
    }
  }
}
