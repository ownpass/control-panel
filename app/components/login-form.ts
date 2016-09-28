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
                    <label for="login-username">Email</label>
                    <input id="login-username" type="text" placeholder="user@domain.com" formControlName="username"/>
                    <div class="error" [hidden]="myForm.controls.username.valid || (myForm.controls.username.pristine && !submitted)">
                        Name is required (Alphanumeric characters only).
                    </div>
                </li>
                <li>
                    <label for="login-password">Master password</label>
                    <input for="login-password" type="password" placeholder="******" formControlName="password"/>
                    <div class="error" [hidden]="myForm.controls.password.valid || (myForm.controls.password.pristine && !submitted)">
                        Password is required
                    </div>
                </li>
                <li class="submit">
                    <button>Login</button>
                </li>
            </ul>
        </form>
    `,
    styleUrls: ['app/components/login-form.css']
})

export class LoginFormComponent {   
    public title = 'Login!'
    public submitted: boolean;

    constructor(private _fb: FormBuilder, private oAuth: OAuth, private cv: CredentialsValidator, private router: Router) {
        // check if the user is logged in!
    }

    login = (submitEvent: Event, model: Credentials, isValid: boolean) => {
        let that = this;
        this.submitted = true;       
        
        if (isValid) {
            this.oAuth.login(model)
            .subscribe(
                response => {
                    if (response.status === 200 && response.hasOwnProperty('_body')) {
                        that.oAuth.setToken(response['_body'])
                        that.router.navigateByUrl('control-panel');
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
