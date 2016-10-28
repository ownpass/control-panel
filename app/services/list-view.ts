import { LS } from "./localstorage";
import { Injectable } from "@angular/core";

@Injectable()
export class ListView {
    private localStorageKey:string = 'ownpassView';

    constructor(private ls: LS) {
    }

    public toggleView = (event: Event) => {
        event.preventDefault();
        this.isGrid = !this.isGrid;
        this.ls.set(this.localStorageKey, this.isGrid ? 'grid' : 'list');
    }
    
    public getView = () => {
        let ls = this.ls.get(this.localStorageKey);
        return ls === 'grid';
    }

    public isGrid:boolean = this.getView();
}
