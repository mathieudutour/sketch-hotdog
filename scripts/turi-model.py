import turicreate as tc
import os

# You might see a bunch of "Not a JPEG file" errors, you can ignore them safely
print('Loading all the images in the datasets')
data = tc.image_analysis.load_images(
    os.path.abspath('./datasets/'),
    with_path=True
)

print('Labelling the images: if it\'s in the hotdog folder then it\'s hotdog')
data['label'] = data['path'].apply(
    lambda path: 'hotdog' if '/datasets/hotdog/' in path else 'nothotdog'
)

print(data.groupby('label', [tc.aggregate.COUNT]))

# uncomment to show a UI to explore the dataset
# data.explore()

# train the model using squeezenet
model = tc.image_classifier.create(
    data,
    target='label',
    model='squeezenet_v1.1',
    max_iterations=40
)

# export the model to a coreML file
model.export_coreml('HotdogNotHotdog.mlmodel')
