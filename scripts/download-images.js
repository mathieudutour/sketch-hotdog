/**
  Download images from a file containing URLS.
  The file must contain a single URL per line.

  Usage:
    node ./download-images.js PATH/TO/IMAGE_NET/FILE.txt PATH/TO/OUTPUT/FOLDER

  It will look something like this:
  # create the output folders
  mkdir -p datasets/hotdog/ && mkdir -p datasets/not_hotdog/
  # process different input files
  node ./download-images.js plants.txt datasets/not_hotdog/
  node ./download-images.js hotdog.txt datasets/hotdog/
 */
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const Stream = require("stream").Transform;

// the first argument is the path to the file containing the URLs
const inputFile = path.join(process.cwd(), process.argv[2]);
// the second argument is the path to the folder in which we will store the downloaded images
const outputDir = path.join(process.cwd(), process.argv[3]);

// we will prefix the image names by the name of the input file
const prefix = path.basename(inputFile).replace(path.extname(inputFile), '');

// read the input file and create an array of URLs
const imageURLS = fs
  .readFileSync(inputFile, "utf8")
  .split("\n")
  .map(url => url.trim())
  .filter(url => url);

let successCount = 0;
let errorCount = 0;

// after each attempt to download an image,
// print the progress and exit when we reach the end
function onEnd(err) {
  if (err) {
    errorCount += 1;
  } else {
    successCount += 1;
  }

  console.log(
    `${err ? "☠️" : "✅"}  ${successCount + errorCount} / ${imageURLS.length}`
  );

  if (successCount + errorCount === imageURLS.length) {
    console.log();
    console.log(`${errorCount} fail\n${successCount} success`);
    process.exit();
  }
}

imageURLS.forEach((url, i) => {
  // check if we need an http or https request
  const { request } = url.indexOf("http:") === 0 ? http : https;

  const imageName = `${prefix}_${i}${path.extname(url)}`;

  const r = request(url.trim(), response => {
    const data = new Stream();

    response.on("data", chunk => {
      data.push(chunk);
    });

    response.on("error", onEnd);

    response.on("end", () => {
      fs.writeFileSync(
        path.join(outputDir, imageName),
        data.read()
      );
      onEnd();
    });
  });

  r.on("error", onEnd);

  r.end();
});
