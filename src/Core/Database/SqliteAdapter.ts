import Database from "better-sqlite3"
import path from "path"

class SqliteAdapter {
  private database

  constructor () {
    this.database = new Database(
      // @todo: replace with a const
      path.resolve(__dirname + '/../../../database/database.db')
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

export default SqliteAdapter
