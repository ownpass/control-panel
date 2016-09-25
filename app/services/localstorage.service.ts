import { Injectable } from '@angular/core';


@Injectable()
export class LS {
    constructor() {
        return this;
    }
    get = (localStorageKey: string) => {
       return localStorage.getItem(localStorageKey); 
    }
    set = (localStorageKey: string, value: JSON) => {
       localStorage.setItem(localStorageKey, JSON.stringify(value)); 
    }
}