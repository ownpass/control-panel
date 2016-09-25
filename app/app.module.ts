import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { LoginFormComponent }   from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';
import { PageNotFoundComponent} from './page-not-found.component';
import { WelcomeComponent } from './welcome.component';
import { LS } from './services/localstorage.service'


//enableProdMode();

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, ],
  declarations: [ AppComponent, LoginFormComponent, PageNotFoundComponent, WelcomeComponent],
  bootstrap:    [ AppComponent ],
  providers:    [ appRoutingProviders, LS ],
})


export class AppModule { }
