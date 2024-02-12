export interface ConfigApplication {
    hostname: string;
    machine: string;
    http: ConfigHttpServer;
}

export interface ConfigFilesystemRepository {
    path: string;
}

export interface ConfigHttpServer {
    port: number;
}
