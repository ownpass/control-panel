import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <h1>Ownpass</h1>
    <login-form></login-form>
  `,
})

export class AppComponent { }