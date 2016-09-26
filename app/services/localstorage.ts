import { Injectable } from '@angular/core';

@Injectable()
export class LS {
    get = (localStorageKey: string) => {
       return localStorage.getItem(localStorageKey); 
    }
    getJSON = (localStorageKey: string) => {
       return JSON.parse(localStorage.getItem(localStorageKey)); 
    }
    set = (localStorageKey: string, value: string) => {
       localStorage.setItem(localStorageKey, value); 
    }
    setJSON = (localStorageKey: string, value: JSON) => {
       localStorage.setItem(localStorageKey, JSON.stringify(value)); 
    }
    remove = (localStorageKey: string) => {
       localStorage.removeItem(localStorageKey); 
    }
    

}