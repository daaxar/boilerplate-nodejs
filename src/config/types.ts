export interface ConfigApplication {
    hostname: string;
    machine: string;
    http: ConfigHttpServer;
}
export interface ConfigHttpServer {
    port: number;
}
