import { config } from './config';
import { Server } from './infrastructure/http/Server';

const app = Server(config);

app.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
