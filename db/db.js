

// import dbFather from '../db/db_6_seller.js'
var dbFather = require('db_6_seller.js')
class db extends dbFather {


    constructor() {
        super()

    }

}


module.exports = new db()