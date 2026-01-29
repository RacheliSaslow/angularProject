import { Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  dialogService = inject(DialogService);
  dialogState = this.dialogService.dialogState$;

}
