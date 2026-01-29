import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  currentUser = this.dataService.currentUser;
  userName = computed(() => this.currentUser()?.name || 'Guest');
  isAuthenticated = computed(() => !!this.currentUser());

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }
}
