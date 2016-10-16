import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class Config {
    /**
     * The url of the configuration file to load.
     *
     * @type {string}
     */
    private static url: string = 'config.json';

    /**
     * The client id used to communicate with the API.
     *
     * @type {string}
     */
    private clientId: string;

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
        this.http.get(Config.url).map(
            response => response.json()
        ).subscribe(
            response => {
                this.clientId = response.client_id;
                this.serverUrl = response.server_api;
            }
        );
    }
}
