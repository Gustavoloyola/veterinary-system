import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  OwnerRequest,
  OwnerService
} from '../../../core/services/owner';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './owner-form.html',
  styleUrl: './owner-form.css'
})
export class OwnerForm implements OnInit {

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly editMode = signal(false);

  private ownerId: number | null = null;

  readonly ownerForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ownerService: OwnerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.ownerForm = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      address: ['', Validators.maxLength(250)]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    this.ownerId = Number(idParam);
    this.editMode.set(true);
    this.loadOwner(this.ownerId);
  }

  private loadOwner(id: number): void {
    this.loading.set(true);

    this.ownerService.findById(id).subscribe({
      next: owner => {
        this.ownerForm.patchValue({
          name: owner.name,
          phone: owner.phone,
          email: owner.email,
          address: owner.address ?? ''
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('No fue posible cargar el propietario.');
      }
    });
  }

  submit(): void {
    if (this.ownerForm.invalid || this.loading()) {
      this.ownerForm.markAllAsTouched();
      return;
    }

    const request: OwnerRequest = this.ownerForm.getRawValue();

    this.loading.set(true);
    this.errorMessage.set('');

    const operation = this.editMode() && this.ownerId !== null
      ? this.ownerService.update(this.ownerId, request)
      : this.ownerService.create(request);

    operation.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/owners']);
      },
      error: error => {
        this.loading.set(false);

        if (error.status === 409) {
          this.errorMessage.set('Ya existe un propietario con ese correo.');
          return;
        }

        this.errorMessage.set('No fue posible guardar el propietario.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/owners']);
  }
}
