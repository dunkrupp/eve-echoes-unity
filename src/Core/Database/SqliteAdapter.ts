import Database from "better-sqlite3"
import path from "path"

class SqlLiteAdapter {
  private database

  constructor () {
    this.database = new Database(
      path.resolve(__dirname)
    )
    // @todo: implement
  }

  read() {
    //@todo: implement
  }

  write() {
    //@todo: implement
  }

  query() {
    //@todo: implement
  }

  queryBy() {
    //@todo: implement
  }
}

export default SqlLiteAdapter
