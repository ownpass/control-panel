import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent} from './components/page-not-found';
import { AppComponent} from './components/app';
import { LoginFormComponent }   from './components/login-form';
import { ControlPanelComponent } from './components/control-panel';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: '', component: LoginFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
