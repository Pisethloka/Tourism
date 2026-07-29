import os
from PIL import Image

p1 = r"d:\Self-learning\VibeCoding\Web2\src\assets\hero_angkor.png"
p2 = r"d:\Self-learning\VibeCoding\Web2\src\assets\bayon_buddha_close.jpg"
p3 = r"d:\Self-learning\VibeCoding\Web2\src\assets\bayon_buddha.png"

img1 = Image.open(p1)
img2 = Image.open(p2)
img3 = Image.open(p3)

print("hero_angkor:", img1.size, img1.mode)
print("bayon_buddha_close:", img2.size, img2.mode)
print("bayon_buddha:", img3.size, img3.mode)
