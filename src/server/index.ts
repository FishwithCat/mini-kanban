import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import cardsRouter from './service/cardsService';
import userRouter from './service/userService';
import valueStreamRouter from './service/valueStreamService';
import statisticRouter from './service/statisticService';
import koaStatic from 'koa-static';

export const startServer = (port: number, indexPagePath: string | null = null): void => {
    const app = new Koa()
    app.use(bodyParser())

    if (indexPagePath) {
        app.use(koaStatic(indexPagePath))
    }

    app.use(cardsRouter.routes())
    app.use(userRouter.routes())
    app.use(valueStreamRouter.routes())
    app.use(statisticRouter.routes())

    app.listen(port);
    console.log(`Server listening on port ${port}!`)
    // const app = express()
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());

    // // app.use('/cards', CardsService)

    // app.listen(port, () => console.log(`Server listening on port ${port}!`))
}
