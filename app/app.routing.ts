import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent} from './page-not-found.component';
import { AppComponent} from './app.component';
import { LoginFormComponent }   from './login-form.component';
import { WelcomeComponent } from './welcome.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', component: LoginFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
