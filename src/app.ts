import express from 'express'
import path from 'path'
import cors from 'cors'
import logger from 'morgan'
import compression from 'compression'
import routes from './routes'
import connection from './database/connection'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.config()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.json())
    this.express.use(logger('dev'))
    this.express.use(compression())
    this.express.use(express.static(path.join(__dirname, 'static')))
  }

  private database (): void {
    const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eolwa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    connection(db)
  }

  private config (): void {
    this.express.set('port', process.env.PORT || 3000)
    this.express.set('views', path.join(__dirname, 'views'))
    this.express.set('view engine', 'ejs')
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
