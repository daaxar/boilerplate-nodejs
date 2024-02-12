import { config } from './config';
import { AppService } from './application/app';
import { Server } from './infrastructure/http/Server';
import { TemplateMemoryRepository } from './infrastructure/data/TemplateMemoryRepository';

const repo = new TemplateMemoryRepository(config);
const app = new AppService(repo, config);
const srv = Server(app, config);

srv.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
