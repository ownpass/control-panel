import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Device} from '../../services/device';
import {LS} from '../../services/localstorage';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'ownpass-device-activate',
    styleUrls: ['app/components/device-activate/device-activate.css'],
    templateUrl: 'app/components/device-activate/device-activate.html'
})

export class DeviceActivateComponent implements OnInit {
    public isActivating: boolean;
    public isActivated: boolean;
    public code: string;

    public constructor(private title: Title,
                       private route: ActivatedRoute,
                       private deviceService: Device,
                       private localStorage: LS) {
        this.title.setTitle('OwnPass Device Activation');

        this.isActivating = true;
        this.isActivated = false;
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let code = params['code'];

            if (code) {
                this.code = code;
                this.activateDevice();
            }
        });
    }

    activateDevice(): void {
        this.isActivating = true;

        this.deviceService.activate(this.code).subscribe(
            response => {
                this.isActivating = false;
                this.isActivated = true;
            },
            error => {
                this.isActivating = false;
                this.isActivated = false;
            }
        );
    }
}
