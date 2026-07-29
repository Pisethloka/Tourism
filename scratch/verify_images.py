import os
from PIL import Image

assets_dir = r"d:\Self-learning\VibeCoding\Web2\src\assets"

for fname in os.listdir(assets_dir):
    if fname.endswith(('.png', '.jpg', '.jpeg')):
        fpath = os.path.join(assets_dir, fname)
        img = Image.open(fpath)
        print(f"{fname}: {img.size}, mode={img.mode}")
