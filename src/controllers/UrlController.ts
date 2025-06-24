import { Request, Response } from 'express'
import UrlModel from '../models/UrlModel'

class UrlController {
  public async index (req: Request, res: Response): Promise<void> {
    const urls = await UrlModel.find()

    res.render('index', { urls })
  }

  public async create (req: Request, res: Response): Promise<void> {
    const { fullUrl } = req.body

    const foundUrl = await UrlModel.findOne({ full: fullUrl })

    if (foundUrl) {
      res.redirect('/')
    }

    await UrlModel.create({ full: fullUrl })
    res.redirect('/')
  }

  public async show (req: Request, res: Response): Promise<void> {
    const { short } = req.params

    const url = await UrlModel.findOne({ short })

    if (url === null) {
      res.sendStatus(404)
    }

    url!.clicks += 1
    url!.save()

    return res.redirect(url!.full)
  }
}

export default new UrlController()
