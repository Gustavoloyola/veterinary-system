import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  Owner,
  OwnerService
} from '../../../core/services/owner';

@Component({
  selector: 'app-owner-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-list.html',
  styleUrl: './owner-list.css'
})
export class OwnerList implements OnInit {

  readonly owners = signal<Owner[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly deletingId = signal<number | null>(null);

  constructor(
    private readonly ownerService: OwnerService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.ownerService.findAll().subscribe({
      next: owners => {
        this.owners.set(owners);
        this.loading.set(false);
      },
      error: error => {
        this.loading.set(false);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        this.errorMessage.set(
          'No fue posible cargar los propietarios.'
        );
      }
    });
  }

  newOwner(): void {
    this.router.navigate(['/owners/new']);
  }

  editOwner(id: number): void {
    this.router.navigate(['/owners', id, 'edit']);
  }

  deleteOwner(owner: Owner): void {
    const confirmed = window.confirm(
      `¿Deseas eliminar al propietario ${owner.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.deletingId.set(owner.id);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.ownerService.delete(owner.id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.successMessage.set(
          `El propietario ${owner.name} fue eliminado.`
        );

        this.owners.update(currentOwners =>
          currentOwners.filter(currentOwner =>
            currentOwner.id !== owner.id
          )
        );
      },
      error: error => {
        this.deletingId.set(null);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        if (error.status === 404) {
          this.errorMessage.set(
            'El propietario ya no existe.'
          );
          this.loadOwners();
          return;
        }

        this.errorMessage.set(
          'No fue posible eliminar el propietario.'
        );
      }
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
