import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import cardsRouter from './service/cardsService';
import userRouter from './service/userService';
import valueStreamRouter from './service/valueStreamService';

export const startServer = (port: number): void => {
    const app = new Koa()
    app.use(bodyParser())

    app.use(cardsRouter.routes())
    app.use(userRouter.routes())
    app.use(valueStreamRouter.routes())

    app.listen(port);
    console.log(`Server listening on port ${port}!`)
    // const app = express()
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());

    // // app.use('/cards', CardsService)

    // app.listen(port, () => console.log(`Server listening on port ${port}!`))
}
