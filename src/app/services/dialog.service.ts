import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogState = signal<{ isOpen: boolean, message: string, type: 'confirm' | 'info' }>({ isOpen: false, message: '', type: 'confirm' });
  private confirmationSubject = new Subject<boolean>();

  dialogState$ = this.dialogState.asReadonly();
  confirmation$ = this.confirmationSubject.asObservable();

  constructor() { }

  open(message: string, type: 'confirm' | 'info' = 'confirm') {
    this.dialogState.set({ isOpen: true, message, type });
  }

  confirm() {
    this.confirmationSubject.next(true);
    this.dialogState.set({ isOpen: false, message: '', type: 'confirm' });
  }

  cancel() {
    this.confirmationSubject.next(false);
    this.dialogState.set({ isOpen: false, message: '', type: 'confirm' });
  }
}
