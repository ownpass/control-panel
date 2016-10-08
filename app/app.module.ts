import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app';
import {LoginComponent} from './components/login/login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders}  from './app.routing';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {DashboardComponent} from './components/dashboard/dashboard';
import {VaultComponent} from './components/vault/vault';
import {NavigationComponent} from './components/navigation/navigation';
import {LS} from './services/localstorage';
import {User} from './services/user';
import {Vault} from './services/vault';
import {OAuth} from './services/oauth';

//enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        PageNotFoundComponent,
        VaultComponent,
        NavigationComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        LS,
        User,
        OAuth,
        Vault
    ],
})


export class AppModule {
}
