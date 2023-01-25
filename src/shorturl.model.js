const mongoose = require('mongoose')

const ShorturlSchema = new mongoose.Schema({
    urlcode: String,
    longurl: String,
    shorturl: String,
    domain:String,
    date: {
        type: String,
        default: Date.now
    }
})

const ShortUrl = mongoose.model('shorturl', ShorturlSchema)
module.exports=ShortUrl;