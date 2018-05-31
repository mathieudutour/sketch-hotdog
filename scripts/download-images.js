/**
  Download images from a file containing URLS.

  The URL file must contain a single URL per line.
 */

const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const Stream = require('stream').Transform

const inputFile = path.join(process.cwd(), process.argv[2])
const outputDir = path.join(process.cwd(), process.argv[3])
const basename = path.basename(inputFile)

const imageURLS = fs.readFileSync(inputFile, 'utf8').split('\n').map(url => url.trim()).filter(url => url)

let successCount = 0
let errorCount = 0

function onEnd(err) {
  if (err) {
    errorCount += 1
  } else {
    successCount += 1
  }

  console.log(`${err ? '☠️' : '✅'}   ${successCount + errorCount} / ${imageURLS.length}`)

  if (successCount + errorCount === imageURLS.length) {
    console.log()
    console.log(`${errorCount} fail\n${successCount} success`)
    process.exit()
  }
}

imageURLS.forEach((url, i) => {
  const { request } = url.indexOf('http:') === 0 ? http : https
  const ext = path.extname(url)
  const r = request(url.trim(), (response) => {
    const data = new Stream()

    response.on('data', (chunk) => {
      data.push(chunk);
    })

    response.on('error', onEnd)

    response.on('end', () => {
      fs.writeFileSync(path.join(outputDir, `${basename}_${i}${ext}`), data.read())
      onEnd()
    })
  })

  r.on('error', onEnd)

  r.end()
})
