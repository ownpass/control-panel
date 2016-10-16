import {Api} from '../../services/api';
import {Component} from '@angular/core';
import {Config} from '../../services/config';
import {Credentials} from '../../interfaces/credentials';
import {CredentialsValidator} from '../../forms/credentials-validator';
import {Device} from '../../services/device';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {OAuth} from '../../services/oauth';
import {Router} from '@angular/router';

@Component({
    selector: 'ownpass-login',
    providers: [OAuth, CredentialsValidator],
    styleUrls: ['app/components/login/login.css'],
    templateUrl: 'app/components/login/login.html'
})

export class LoginComponent {
    public title = 'OwnPass'
    public submitted: boolean;

    constructor(private config: Config,
                private _fb: FormBuilder,
                private oAuth: OAuth,
                private cv: CredentialsValidator,
                private router: Router,
                private deviceService: Device,
                private api: Api) {
    }

    login = (submitEvent: Event, model: Credentials, isValid: boolean) => {
        let that = this;
        this.submitted = true;

        if (isValid) {
            this.oAuth.login(model).subscribe(
                response => {
                    if (response.status === 200 && response.hasOwnProperty('_body')) {
                        that.oAuth.setToken(response['_body']);

                        this.api.setUsername(model.username);

                        if (this.api.getDeviceId(model.username) === null) {
                            this.deviceService.create(
                                this.config.getDeviceName(),
                                this.config.getDeviceDescription()
                            ).subscribe(
                                response => {
                                    this.api.setDeviceId(model.username, response.id);
                                }
                            )
                        }

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
