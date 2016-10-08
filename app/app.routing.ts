import {AccountComponent} from './components/account/account';
import {AccountFormComponent} from './components/account-form/account-form';
import {DashboardComponent} from './components/dashboard/dashboard';
import {LoginComponent}   from './components/login/login';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'admin/accounts', component: AccountComponent},
    {path: 'admin/accounts/create', component: AccountFormComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
