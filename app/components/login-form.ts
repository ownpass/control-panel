import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { OAuth } from '../services/oauth';
import { Credentials } from '../interfaces/credentials';
import { CredentialsValidator } from '../forms/credentials-validator';
import { Router } from '@angular/router';



@Component({
    selector: 'login-form',
    providers: [OAuth, CredentialsValidator],
    template: `
        <form [formGroup]="myForm" novalidate (submit)="login($event, myForm.value, myForm.valid)">
            <h2>{{title}}</h2>
            <ul> 
                <li>
                    <input type="text" placeholder="username" formControlName="username"/>
                    <small [hidden]="myForm.controls.username.valid || (myForm.controls.username.pristine && !submitted)">
                        Name is required (Alphanumeric characters only).
                    </small>
                </li>
                <li>
                    <input type="password" placeholder="password" formControlName="password"/>
                    <small [hidden]="myForm.controls.password.valid || (myForm.controls.password.pristine && !submitted)">
                        Password is required
                    </small>
                </li>
                <li>
                    <button>klik</button>
                </li>
            </ul>
        </form>
    `,
    styles: [`
        small {
            color: red;
        }
    `]
})

export class LoginFormComponent {
    constructor(private _fb: FormBuilder, private oAuth: OAuth, private cv: CredentialsValidator, private router: Router) {
        // check if the user is logged in!
    }
    
    public title = 'Login!'
    public submitted: boolean;

    login = (submitEvent: Event, model: Credentials, isValid: boolean) => {
        let that = this;
        this.submitted = true;       
        
        if (isValid) {
            this.oAuth.login(model)
            .subscribe(
                response => {
                    if (response.status === 200 && response.hasOwnProperty('_body')) {
                        that.oAuth.setToken(response['_body'])
                        that.router.navigateByUrl('welcome');
                    }
                },
                error => {
                    if (error.status === 401) {
                        console.log('you shall not pass')
                    } else {
                        console.log(error);
                    }
                },
                () => console.log('Completed!')
            );
        }
    }

    myForm = new FormGroup({
        username: new FormControl('', this.cv.getValidator('username')),
        password: new FormControl('', this.cv.getValidator('password'))
    });

}
