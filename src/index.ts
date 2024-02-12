import { config } from './config';
import { AppService } from './application/app';
import { Server } from './infrastructure/http/Server';
import { TemplateRepository } from './application/data/TemplateRepository';

const repo = new TemplateRepository(config);
const app = new AppService(repo, config);
const srv = Server(app, config);

srv.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
