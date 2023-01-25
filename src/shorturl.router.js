const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const Url = require('./shorturl.model')

const baseUrl = 'http://localhost:8080'

const app = express.Router()


app.post('/short', async (req, res) => {
    const {longurl,domain} = req.body 

    const urlcode = shortid.generate()
console.log(urlcode)
    if (validUrl.isUri(longurl)) {
        try {
            let url = await Url.findOne({
                longurl
            })

            if (url) {
               // console.log("hii")
                res.send(url)
            } else {
                if(domain){
                    let num=shortid.generate()
                    //console.log(num)
                    let d=`${num}-${domain}`
                    //console.log(d)
                    const shorturl =`${baseUrl}/${d}`
               
                    url = new Url({longurl,shorturl,urlcode:d,date: new Date()})
                    await url.save()
                    console.log(url)
                    res.send(url)
                }
                else{
                    const shorturl =`${baseUrl}/${urlcode}`
               
                url = new Url({longurl,shorturl,urlcode,date: new Date()})
                await url.save()
                console.log(url)
                res.send(url)
                }
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send('Server Error')
        }
    } else {
        res.status(401).send('Invalid longUrl')
    }
})




app.get('/:code', async (req, res) => {
    try {
       //console.log(req.params);
        const url = await Url.findOne({
            urlcode: req.params.code
        })
        if (url) {
           // console.log(url.longurl);
           return res.redirect(url.longurl)
        } else {
            return res.status(404).send('No URL Found')
        }

    }
    catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

module.exports = app