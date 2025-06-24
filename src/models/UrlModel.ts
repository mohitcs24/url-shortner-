import { Schema, Document, model } from 'mongoose'
import shortId from 'shortid'

interface UrlInterface extends Document {
  full: string;
  short: string;
  clicks: number;
}

const UrlSchema: Schema = new Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

const UrlModel = model<UrlInterface>('Url', UrlSchema)

export default UrlModel
