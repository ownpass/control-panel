import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { OAuth } from '../../services/oauth';
import { Credentials } from '../../interfaces/credentials';
import { CredentialsValidator } from '../../forms/credentials-validator';
import { Router } from '@angular/router';

@Component({
    selector: 'ownpass-login',
    providers: [OAuth, CredentialsValidator],
    styleUrls: ['app/components/login/login.css'],
    templateUrl: 'app/components/login/login.html'
})

export class LoginComponent {
    public title = 'OwnPass'
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
                        that.router.navigateByUrl('dashboard');
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
