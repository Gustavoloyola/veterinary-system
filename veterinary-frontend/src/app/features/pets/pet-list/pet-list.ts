import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Pet, PetService } from '../../../core/services/pet';
import { Owner, OwnerService } from '../../../core/services/owner';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css'
})
export class PetList implements OnInit {

  readonly pets = signal<Pet[]>([]);
  readonly owners = signal<Owner[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly deletingId = signal<number | null>(null);

  speciesFilter = '';
  ownerFilter: number | null = null;

  constructor(
    private readonly petService: PetService,
    private readonly ownerService: OwnerService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadOwners();
    this.loadPets();
  }

  loadOwners(): void {
    this.ownerService.findAll().subscribe({
      next: owners => this.owners.set(owners),
      error: () => {
        this.errorMessage.set(
          'No fue posible cargar los propietarios.'
        );
      }
    });
  }

  loadPets(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.petService.findAll(
      this.speciesFilter,
      this.ownerFilter
    ).subscribe({
      next: pets => {
        this.pets.set(pets);
        this.loading.set(false);
      },
      error: error => {
        this.loading.set(false);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        this.errorMessage.set(
          'No fue posible cargar las mascotas.'
        );
      }
    });
  }

  applyFilters(): void {
    this.loadPets();
  }

  clearFilters(): void {
    this.speciesFilter = '';
    this.ownerFilter = null;
    this.loadPets();
  }

  newPet(): void {
    this.router.navigate(['/pets/new']);
  }

  editPet(id: number): void {
    this.router.navigate(['/pets', id, 'edit']);
  }

  deletePet(pet: Pet): void {
    const confirmed = window.confirm(
      `¿Deseas eliminar a la mascota ${pet.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.deletingId.set(pet.id);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.petService.delete(pet.id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.successMessage.set(
          `La mascota ${pet.name} fue eliminada.`
        );

        this.pets.update(current =>
          current.filter(item => item.id !== pet.id)
        );
      },
      error: error => {
        this.deletingId.set(null);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        this.errorMessage.set(
          'No fue posible eliminar la mascota.'
        );
      }
    });
  }

  ownerName(ownerId: number): string {
    return this.owners()
      .find(owner => owner.id === ownerId)?.name
      ?? `Propietario ${ownerId}`;
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
