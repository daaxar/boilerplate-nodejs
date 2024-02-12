import { config } from './config';
import { AppService } from './application/app';
import { Server } from './infrastructure/http/Server';
import { TemplateFilesystemRepository } from './infrastructure/data/TemplateFilesystemRepository';

const repo = new TemplateFilesystemRepository({
    ...config,
    data: { filesystem: { path: './DATA' } },
});
const app = new AppService(repo, config);
const srv = Server(app, config);

srv.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
