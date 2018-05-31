# 🌭  Sketch Hot Dog

_Did you ever wonder if your sketch layer was a 🌭?_

![is it a hotdog](https://user-images.githubusercontent.com/3254314/40763672-7d9179ec-645a-11e8-9c42-a533ac896a40.gif)

## 🌭  Installation

_Requires Sketch 49+ and macOS 10.13+

* [Download](https://github.com/mathieudutour/sketch-hotdog/releases/latest) the latest release of the plugin
* Un-zip
* Double-click on hotdog.sketchplugin

## 🌭  Usage

* Select an image layer
* Click on `Plugins > Is it a 🌭?`

## 🌭  Development Guide

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

Install the dependencies

```bash
pip install turicreate
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
# download the datasets of images
npm run download-datasets

# train the model
npm run train-model

# build the sketch plugin
npm run build
```

To watch for changes:

```bash
npm run watch
```

Additionally, if you wish to run the plugin every time it is built:

```bash
npm run start
```
