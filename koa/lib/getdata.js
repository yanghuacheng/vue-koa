// 抓取网络资源
// const fs = require('fs')
const http = require('http')
const https = require('https')
// const path = require('path')
module.exports = function(url) {
    const request = /^https:\/\//.test(url) ? https.request : http.request
    let image = url.match(/^(:?https?\:)?\/\/[^#?]+/)[0]
    let originalname = image.substr(image.lastIndexOf('\/') + 1)
    let contentType = ''
    let base64Data = ''
    return new Promise((resolve, reject) => {
        const req = request(url, (res) => {
            contentType = res.headers['content-type']
            res.setEncoding('base64')
            res.on('data', (chunk) => {
                base64Data += chunk
            })
            res.on('end', () => resolve({contentType, base64Data, originalname}))
        })

        req.on('error', (err) => resolve({error: true}))
        req.end()
    })
}