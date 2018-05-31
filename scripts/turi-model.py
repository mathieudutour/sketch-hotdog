import turicreate as tc
import os

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

# getting training and test data
train_data, test_data = data.random_split(0.8)

# train the model using squeezenet
model = tc.image_classifier.create(
    train_data,
    target='label',
    model='squeezenet_v1.1',
    max_iterations=100
)

# export the model to a coreML file
model.export_coreml('HotdogNotHotdog.mlmodel')
