import sketch from 'sketch' // eslint-disable-line
import fs from '@skpm/fs'
import path from '@skpm/path'

function checkIfErr(label, err) {
  if (err.value() !== null) {
    const message = `Error while ${label}`
    console.error(message)
    sketch.UI.message(message)
    throw new Error(err.value())
  }
}

export default function(context) {
  const document = sketch.getSelectedDocument() || sketch.Document.fromNative(context.document)
  if (!document) {
    console.log('no document')
    return
  }

  const selectedLayer = document.selectedLayers.layers[0]

  if (!selectedLayer || selectedLayer.type !== 'Image') {
    const message = 'You need to select an image'
    sketch.UI.message(message)
    console.log(message)
    return
  }

  const {nsdata} = selectedLayer.image

  if (typeof VNCoreMLModel === 'undefined') {
    __mocha__.loadFrameworkWithName('Vision')
  }

  const err = MOPointer.alloc().init()

  // find path to compiled model
  const modelURL = path.join(path.dirname(context.plugin.urlForResourceNamed('HotdogNotHotdog.mlmodel')), 'HotdogNotHotdog.mlmodelc')

  // check if we already compiled the model
  if (!fs.existsSync(modelURL)) {
    const tempModelURL = MLModel.compileModelAtURL_error(context.plugin.urlForResourceNamed("HotdogNotHotdog.mlmodel"), err)
    checkIfErr('compiling model', err)

    // move the compiled model to our plugin so we can reuse it later
    fs.renameSync(tempModelURL.path(), modelURL)
  }

  const model = MLModel.modelWithContentsOfURL_error(NSURL.fileURLWithPath(modelURL), err)
  checkIfErr('reading model', err)

  const vnModel = VNCoreMLModel.modelForMLModel_error(model, err)
  checkIfErr('creating vn model', err)

  const request = VNCoreMLRequest.alloc().initWithModel(vnModel)
  request.imageCropAndScaleOption = 0

  const ciImage = CIImage.imageWithData(nsdata)

  const handler = VNImageRequestHandler.alloc().initWithCIImage_options(ciImage, null)

  const success = handler.performRequests_error([request], err)

  if (success) {
    const topResult = request.results()[0]
    const isHotDog = String(topResult.identifier()) === 'hotdog'
    sketch.UI.message(isHotDog ? 'Yep, it\'s a 🌭' : 'Nope ❌')
  } else {
    checkIfErr('making request', err)
  }
}
