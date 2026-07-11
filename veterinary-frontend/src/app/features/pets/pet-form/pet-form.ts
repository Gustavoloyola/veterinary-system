import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  PetRequest,
  PetService
} from '../../../core/services/pet';

import {
  Owner,
  OwnerService
} from '../../../core/services/owner';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css'
})
export class PetForm implements OnInit {

  readonly owners = signal<Owner[]>([]);
  readonly loading = signal(false);
  readonly loadingOwners = signal(true);
  readonly errorMessage = signal('');
  readonly editMode = signal(false);

  private petId: number | null = null;

  readonly petForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly petService: PetService,
    private readonly ownerService: OwnerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.petForm = this.formBuilder.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      species: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      breed: [
        '',
        [
          Validators.required,
          Validators.maxLength(80)
        ]
      ],
      birthDate: [
        '',
        Validators.required
      ],
      ownerId: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.loadOwners();

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.errorMessage.set('El identificador de la mascota no es válido.');
      return;
    }

    this.petId = id;
    this.editMode.set(true);
    this.loadPet(id);
  }

  private loadOwners(): void {
    this.loadingOwners.set(true);

    this.ownerService.findAll().subscribe({
      next: owners => {
        this.owners.set(owners);
        this.loadingOwners.set(false);
      },
      error: error => {
        this.loadingOwners.set(false);

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

  private loadPet(id: number): void {
    this.loading.set(true);

    this.petService.findById(id).subscribe({
      next: pet => {
        this.petForm.patchValue({
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          birthDate: pet.birthDate,
          ownerId: pet.ownerId
        });

        this.loading.set(false);
      },
      error: error => {
        this.loading.set(false);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        if (error.status === 404) {
          this.errorMessage.set('La mascota no existe.');
          return;
        }

        this.errorMessage.set(
          'No fue posible cargar la mascota.'
        );
      }
    });
  }

  submit(): void {
    if (this.petForm.invalid || this.loading()) {
      this.petForm.markAllAsTouched();
      return;
    }

    const request: PetRequest = this.petForm.getRawValue();

    this.loading.set(true);
    this.errorMessage.set('');

    const operation =
      this.editMode() && this.petId !== null
        ? this.petService.update(this.petId, request)
        : this.petService.create(request);

    operation.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/pets']);
      },
      error: error => {
        this.loading.set(false);

        if (error.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        if (error.status === 404) {
          this.errorMessage.set(
            'El propietario seleccionado no existe.'
          );
          return;
        }

        if (error.status === 400) {
          this.errorMessage.set(
            'Revisa la información capturada.'
          );
          return;
        }

        this.errorMessage.set(
          'No fue posible guardar la mascota.'
        );
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/pets']);
  }
}
