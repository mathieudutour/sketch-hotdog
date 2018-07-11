# 🌭  Sketch Sausage

_What would you say if I told you there is a sketch plugin on the market that tell you if your sketch layer is a hotdog or not a hotdog. It is very good and I do not want to work on it any more. You can hire someone else._

![is it a hotdog](https://user-images.githubusercontent.com/3254314/40763672-7d9179ec-645a-11e8-9c42-a533ac896a40.gif)

You can read me about it here: [https://blog.sketchapp.com/not-a-hotdog-how-to-build-an-ai-powered-plugin-for-sketch-463ea43c9464](https://blog.sketchapp.com/not-a-hotdog-how-to-build-an-ai-powered-plugin-for-sketch-463ea43c9464).

## 🌭  Installation

_Requires Sketch 49+ and macOS 10.13+_

* [Download](https://github.com/mathieudutour/sketch-hotdog/releases/latest) the latest release of the plugin
* Un-zip
* Double-click on hotdog.sketchplugin

## 🌭  Usage

* Select an image layer
* Click on `Plugins > Is it a sausage?`

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
