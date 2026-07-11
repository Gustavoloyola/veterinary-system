import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { OwnerList } from './features/owners/owner-list/owner-list';
import { OwnerForm } from './features/owners/owner-form/owner-form';
import { authGuard } from './core/guards/auth-guard';
import { PetList } from './features/pets/pet-list/pet-list';
import { PetForm } from './features/pets/pet-form/pet-form';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'owners',
    component: OwnerList,
    canActivate: [authGuard]
  },
  {
    path: 'owners/new',
    component: OwnerForm,
    canActivate: [authGuard]
  },
  {
    path: 'owners/:id/edit',
    component: OwnerForm,
    canActivate: [authGuard]
  },
{
  path: 'pets',
  component: PetList,
  canActivate: [authGuard]
},
{
  path: 'pets/new',
  component: PetForm,
  canActivate: [authGuard]
},
{
  path: 'pets/:id/edit',
  component: PetForm,
  canActivate: [authGuard]
},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
