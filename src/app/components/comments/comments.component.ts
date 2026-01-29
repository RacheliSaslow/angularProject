import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, signal, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input() taskId!: number;
  comments = signal<any[]>([]);
  body!: FormGroup;
  errorMessage: string | null = null;
  private dataService = inject(TasksService);
  private fb = inject(FormBuilder);
  constructor() {
    this.body = this.fb.group({
      content: ['',[Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskId'] && this.taskId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.dataService.getComments(this.taskId).subscribe({
      next: (data) => {
        this.comments.set(data);
      },
      error: (err: Error) => this.errorMessage = err.message
    });
  }

  sendComment() {
    if (this.body.invalid) {
      return;
    }
    const content = this.body.value.content;
    this.dataService.createComment(this.taskId, content).subscribe({
      next: () => {
        this.body.reset();
        this.loadComments();
      },
      error: (err: Error) => this.errorMessage = err.message
    });
  }

}
