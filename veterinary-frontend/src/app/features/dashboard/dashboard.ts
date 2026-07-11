import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
