import { Router } from 'express'
import UrlController from './controllers/UrlController'

const routes = Router()

routes.get('/', UrlController.index)
routes.post('/urls', UrlController.create)
routes.get('/:short', UrlController.show)

export default routes
