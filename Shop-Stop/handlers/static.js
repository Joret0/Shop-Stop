const url = require('url')
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    req.pathName = req.pathName || url.parse(req.url)

    if (req.url.startsWith('/content') && req.method === 'GET') {

        //"path" module is just utility module for editing file paths
        let filePath = path.normalize(
            path.join(__dirname, '../' + req.url))

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('404 not found!')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            })

            res.write(data)
            res.end()
        })
    } else {
        return true
    }
}