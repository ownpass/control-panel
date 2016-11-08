import { Component, Input } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'credential-form',
    styleUrls: [
        'app/components/dashboard/dashboard.css',
        'app/components/credential-form/credential-form.css'
    ],
    templateUrl: 'app/components/credential-form/credential-form.html'
})

export class CredentialFormComponent {
    @Input() credential;
    public account;

    ngOnChanges() {
        var that = this;
        this.account = new FormGroup({
            title: new FormControl(that.credential.title, Validators.required),
            credential: new FormControl(that.credential.credential, Validators.required),
            description: new FormControl(that.credential.description, Validators.required),
            identity: new FormControl(that.credential.identity, Validators.required),
            urlRaw: new FormControl(that.credential.urlRaw, Validators.required),
        });
    }

    close = (event: Event) => {
        event.preventDefault();
        this.credential = {};
    }

    serialize = (event: Event, model: any, isValid: boolean) => {
        event.preventDefault();
        console.log(model);
    }    
}
