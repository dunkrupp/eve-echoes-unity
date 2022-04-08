import path from 'path'
import dotenv from 'dotenv'
import Env from './Contracts/Env'

class Config {
  constructor (filePath = '../../.env') {
    dotenv.config({
      path: path.resolve(__dirname, filePath)
    })

    this.validate()

    return this
  }

  public get (): Env {
    return {
      PREFIX: process.env.PREFIX,
      TOKEN: process.env.TOKEN,
      BOT_NAME: process.env.BOT_NAME,
      BOT_COLOR: process.env.BOT_COLOR,
      BOT_THUMBNAIL: process.env.BOT_THUMBNAIL,
      DB_TYPE: process.env.DB_TYPE,
      DB_PATH: process.env.DB_PATH
    }
  }

  /**
   * Validates our ENV object keys against the values
   * @protected
   */
  protected validate (): void {
    const config = this.get()
    const missing: string[] = []

    Object.entries(config).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        missing.push(key)
      }
    })

    if (missing.length) {
      throw new Error(`Missing .env values: ${JSON.stringify(missing)}`)
    }
  }
}

export default Config
