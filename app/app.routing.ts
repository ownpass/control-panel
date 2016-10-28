import {AccountComponent} from './components/account/account';
import {AccountFormComponent} from './components/account-form/account-form';
import {ActivateDeviceComponent} from './components/activate-device/activate-device';
import {DashboardComponent} from './components/dashboard/dashboard';
import {DeviceActivateComponent} from './components/device-activate/device-activate';
import {LoginComponent}   from './components/login/login';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {ProfileComponent} from './components/profile/profile';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        data: {
            'name': 'home'
        }
    },
    {
        path: 'accounts',
        component: AccountComponent,
        data: {
            'name': 'accounts'
        }
    },
    {
        path: 'accounts/create',
        component: AccountFormComponent,
        data: {
            'name': 'account-create'
        }
    },
    {
        path: 'accounts/edit/:id',
        component: AccountFormComponent,
        data: {
            'name': 'account-edit'
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            'name': 'dashboard'
        }
    },
    {
        path: 'device/inactive',
        component: ActivateDeviceComponent,
        data: {
            'name': 'device-inactive'
        }
    },
    {
        path: 'device/activate/:code',
        component: DeviceActivateComponent,
        data: {
            'name': 'device-activate'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            'name': 'login'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            'name': 'profile'
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: {
            'name': 'catch-all'
        }
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
