export interface ConfigApplication {
    hostname: string;
    machine: string;
    http: ConfigHttpServer;
    data?: {
        filesystem: {
            path: string;
        };
    };
}
export interface ConfigHttpServer {
    port: number;
}
