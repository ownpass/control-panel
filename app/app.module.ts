import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/app';
import { LoginFormComponent }   from './components/login-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';
import { PageNotFoundComponent} from './components/page-not-found';
import { WelcomeComponent } from './components/welcome';
import { MyVaultComponent } from './components/my-vault';
import { NavigationComponent } from './components/navigation';
import { LS } from './services/localstorage';
import { User } from './services/user';
import { Vault } from './services/vault';
import { OAuth } from './services/oauth';


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
    LoginFormComponent, 
    PageNotFoundComponent, 
    WelcomeComponent, 
    MyVaultComponent,
    NavigationComponent
  ],
  bootstrap:[
    AppComponent
  ],
  providers:[
    appRoutingProviders,
    LS,
    User,
    OAuth,
    Vault
  ],
})


export class AppModule { }
