import urllib.request
import os

url = "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=85"
target_path = r"d:\Self-learning\VibeCoding\Web2\src\assets\bayon_buddha_close.jpg"
target_path2 = r"d:\Self-learning\VibeCoding\Web2\src\assets\bayon_buddha.png"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    data = response.read()
    with open(target_path, 'wb') as f:
        f.write(data)
    with open(target_path2, 'wb') as f:
        f.write(data)

print(f"Successfully downloaded real Bayon photo ({len(data)} bytes) to {target_path} and {target_path2}")
