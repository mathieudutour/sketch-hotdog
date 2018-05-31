import turicreate as tc
import os

data = tc.image_analysis.load_images(
    os.path.abspath('./datasets/'),
    with_path=True
)

data['label'] = data['path'].apply(
    lambda path: 'hotdog' if '/datasets/hotdog/' in path else 'nothotdog'
)

data.groupby('label', [tc.aggregate.COUNT])

train_data, test_data = data.random_split(0.8)

model = tc.image_classifier.create(
    train_data,
    target='label',
    model='squeezenet_v1.1',
    max_iterations=100
)

model.export_coreml('HotdogNotHotdog.mlmodel')
