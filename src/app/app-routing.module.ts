import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminClientListComponent } from './pages/admin/admin-client-list/admin-client-list.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminMotelRoomComponent } from './pages/admin/admin-motel-room/admin-motel-room.component';
import { AdminRoomDetailComponent } from './pages/admin/admin-room-detail/admin-room-detail.component';
import { CustomerRentalRoomComponent } from './pages/admin/custormer-rental-room/custormer-rental-room.component';
import { AdminRentalContractComponent } from './pages/admin/admin-rental-contract/admin-rental-contract.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, canActivate: [] },
  { path: 'admin/home', component: AdminDashboardComponent, canActivate: [] },
  { path: 'admin/rooms', component: AdminMotelRoomComponent, canActivate: [] },
  { path: 'admin/room/:id', component: AdminRoomDetailComponent, canActivate: [] },
  { path: 'admin/rental-room/:id', component: CustomerRentalRoomComponent, canActivate: [] },
  { path: 'admin/clients', component: AdminClientListComponent, canActivate: [] },
  { path: 'admin/contract/:id', component: AdminRentalContractComponent, canActivate: [] }
]

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  ...adminRoutes,
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
