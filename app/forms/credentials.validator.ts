import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class CredentialsValidator {
    private validators = {
        username: [
            <any>Validators.required,
            <any>Validators.pattern('^[a-zA-Z0-9]*$')
        ],
        password: [
            Validators.required
        ]
    };

    getValidator(field: string) {
        if (this.validators.hasOwnProperty(field)) {
            return this.validators[field];
        } else {
            throw 'Given field name does not exist!';
        }
    }
}