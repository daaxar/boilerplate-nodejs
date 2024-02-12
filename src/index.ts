import { config } from './config';
import { AppService } from './application/app';
import { Server } from './infrastructure/http/Server';

const app = new AppService(config);
const srv = Server(app, config);

srv.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
