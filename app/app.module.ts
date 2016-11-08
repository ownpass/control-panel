import {Account} from './services/account';
import {AccountComponent} from './components/account/account';
import {AccountFormComponent} from './components/account-form/account-form';
import {ActivateDeviceComponent} from './components/activate-device/activate-device';
import {Api} from './services/api';
import {AppComponent} from './components/app';
import {appRoutingProviders, routing}  from './app.routing';
import {BrowserModule} from '@angular/platform-browser';
import {Config} from './services/config';
import {CredentialFormComponent} from './components/credential-form/credential-form';
import {DashboardComponent} from './components/dashboard/dashboard';
import {Device} from './services/device';
import {DeviceActivateComponent} from './components/device-activate/device-activate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ListView} from './services/list-view';
import {LoginComponent} from './components/login/login';
import {LS} from './services/localstorage';
import {NavigationComponent} from './components/navigation/navigation';
import {NgModule, APP_INITIALIZER, enableProdMode} from '@angular/core';
import {OAuth} from './services/oauth';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {ProfileComponent} from './components/profile/profile';
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
        DeviceActivateComponent,
        LoginComponent,
        NavigationComponent,
        PageNotFoundComponent,
        ProfileComponent,
        VaultComponent,
        ActivateDeviceComponent,
        CredentialFormComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        Account,
        Api,
        appRoutingProviders,
        Config,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: Config) => () => config.load(),
            deps: [Config],
            multi: true
        },
        Device,
        LS,
        OAuth,
        Vault,
        User,
        ListView
    ],
})

export class AppModule {
    constructor() {
    }
}
