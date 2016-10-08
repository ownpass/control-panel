import {Account} from './services/account';
import {AccountComponent} from './components/account/account';
import {AccountFormComponent} from './components/account-form/account-form';
import {AppComponent} from './components/app';
import {appRoutingProviders,routing}  from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {DashboardComponent} from './components/dashboard/dashboard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {LoginComponent} from './components/login/login';
import {LS} from './services/localstorage';
import {NavigationComponent} from './components/navigation/navigation';
import {NgModule, enableProdMode} from '@angular/core';
import {OAuth} from './services/oauth';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {Vault} from './services/vault';
import {VaultComponent} from './components/vault/vault';
import {User} from './services/user';

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
        AccountComponent,
        AccountFormComponent,
        AppComponent,
        DashboardComponent,
        LoginComponent,
        NavigationComponent,
        PageNotFoundComponent,
        VaultComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        Account,
        appRoutingProviders,
        LS,
        OAuth,
        Vault,
        User
    ],
})

export class AppModule {
}
