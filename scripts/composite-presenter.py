import numpy as np
from PIL import Image, ImageFilter, ImageDraw

S = 2  # work at 2x the generated photo for a cleaner warp
photo = Image.open('magnific/p3.png').convert('RGB')
photo = photo.resize((photo.width * S, photo.height * S), Image.LANCZOS)
W, H = photo.size
quad = [(681, 109), (1195, 82), (1196, 420), (681, 412)]
quad = [(x * S, y * S) for x, y in quad]

# The slide: the deck page card on the deck's sky gradient, at 16:9.
SW, SH = 1920, 1080
slide = Image.new('RGB', (SW, SH))
top, bot = np.array([246, 251, 255]), np.array([200, 233, 248])
grad = (top[None, :] * (1 - np.linspace(0, 1, SW))[:, None] + bot[None, :] * np.linspace(0, 1, SW)[:, None])
slide = Image.fromarray(np.repeat(grad[None, :, :], SH, axis=0).astype(np.uint8))
card = Image.open('figma3/deckpage@4x.png').convert('RGBA')
cw = int(SW * 0.9); ch = int(card.height * cw / card.width)
card = card.resize((cw, ch), Image.LANCZOS)
slide.paste(card, ((SW - cw) // 2, (SH - ch) // 2), card)

# Perspective: coefficients map output (photo) pixels back to slide pixels.
def coeffs(dst, src):
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
        B += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()

src = [(0, 0), (SW, 0), (SW, SH), (0, SH)]
warped = slide.transform((W, H), Image.PERSPECTIVE, coeffs(quad, src), Image.BICUBIC)

# Mask: inside the screen quad, and only where the photo shows the blank screen,
# so the presenter's hand and the heads stay in front of the slide.
qmask = Image.new('L', (W, H), 0)
ImageDraw.Draw(qmask).polygon(quad, fill=255)
arr = np.asarray(photo).astype(float)
dist = np.linalg.norm(arr - np.array([226, 236, 239]), axis=2)
screenish = np.clip((60 - dist) / 30, 0, 1) * 255
mask = np.minimum(np.asarray(qmask, float), screenish).astype(np.uint8)
mask = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(1.2))

# Keep the room's light on the screen: modulate by the blank screen's own shading.
lum = arr.mean(axis=2) / 234.0
lum = np.clip(lum, 0.85, 1.08)[..., None]
lit = np.clip(np.asarray(warped, float) * lum, 0, 255)
# A faint diagonal glare across the panel.
yy, xx = np.mgrid[0:H, 0:W]
glare = np.clip(1 - np.abs((xx - W * 0.62) + (yy - H * 0.2) * 0.9) / (W * 0.18), 0, 1)[..., None] * 18
lit = np.clip(lit + glare, 0, 255).astype(np.uint8)

out = Image.composite(Image.fromarray(lit), photo, mask)
out = out.resize((2400, int(2400 * H / W)), Image.LANCZOS)
out.save('presenter-composite.jpg', quality=90)
out.crop((1050, 100, 2150, 800)).save('presenter-zoom.jpg', quality=90)
print(out.size)
