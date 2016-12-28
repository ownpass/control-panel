import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class Config {
    /**
     * The url of the configuration file to load.
     *
     * @type {string}
     */
    private static url: string = 'assets/config.json';

    /**
     * The client id used to communicate with the API.
     *
     * @type {string}
     */
    private clientId: string;

    /**
     * The name of this device.
     *
     * @type {string}
     */
    private deviceName: string;

    /**
     * The description of this device.
     *
     * @type {string}
     */
    private deviceDescription: string;

    /**
     * The RSA public key.
     *
     * @type {string}
     */
    private devicePublicKey: string;

    /**
     * The server url used to do requests to.
     *
     * @type {string}
     */
    private serverUrl: string;

    /**
     * Initializes a new instance of this class.
     *
     * @param http The HTTP service.
     */
    constructor(private http: Http) {
    }

    /**
     * Gets the client id.
     *
     * @returns {string}
     */
    public getClientId(): string {
        return this.clientId;
    }

    /**
     * Gets the name of the device.
     *
     * @returns {string}
     */
    public getDeviceName(): string {
        return this.deviceName;
    }

    /**
     * Gets the description of the device.
     *
     * @returns {string}
     */
    public getDeviceDescription(): string {
        return this.deviceDescription;
    }


    /**
     * Gets the RSA public key.
     *
     * @returns {string}
     */
    public getDevicePublicKey(): string {
        return this.devicePublicKey;
    }

    /**
     * Gets the server url.
     *
     * @returns {string}
     */
    public getServerUrl(): string {
        return this.serverUrl;
    }

    /**
     * Loads the configuration.
     */
    public load() {
        return new Promise((resolve) => {
            this.http.get(Config.url).map(
                res => res.json()
            ).subscribe(response => {
                this.clientId = response['client_id'];
                this.deviceName = response['device_name'];
                this.deviceDescription = response['device_description'];
                this.devicePublicKey = response['public_key'];
                this.serverUrl = response['server_url'];

                resolve();
            });
        });
    }
}
