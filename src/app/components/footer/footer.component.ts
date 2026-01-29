import { Component, inject } from '@angular/core';
import { DataService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  authService = inject(DataService);
  isLoggedIn = this.authService.currentUser;

}
