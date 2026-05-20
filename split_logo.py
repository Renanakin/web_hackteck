import cv2
import numpy as np
from rembg import remove

print("Removing background...")
with open('public/LOGO_HACKTECK.jpeg', 'rb') as i:
    out = remove(i.read())

nparr = np.frombuffer(out, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
cv2.imwrite('public/LOGO_HACKTECK_transparente.png', img)

alpha = img[:, :, 3]
_, thresh = cv2.threshold(alpha, 127, 255, cv2.THRESH_BINARY)

# Function to crop using bounding rect of alpha channel
def crop_alpha(im):
    a = im[:, :, 3]
    x, y, w, h = cv2.boundingRect(a)
    if w == 0 or h == 0:
        return im, 0, 0, 0
    return im[y:y+h, x:x+w], w, h, w/h

# Identify if arrangement is horizontal or vertical
x, y, w, h = cv2.boundingRect(thresh)
print(f"Global bounding box: width={w}, height={h}")

if w > h * 1.5:  # Wide -> Horizontal arrangement
    proj = np.sum(thresh, axis=0)
    non_empty = np.where(proj > 0)[0]
    gaps = []
    for i in range(len(non_empty)-1):
        if non_empty[i+1] - non_empty[i] > 5:
            gaps.append((non_empty[i], non_empty[i+1], non_empty[i+1]-non_empty[i]))
            
    if gaps:
        gaps.sort(key=lambda x: x[2], reverse=True)
        split_pt = (gaps[0][0] + gaps[0][1]) // 2
        p1, p2 = img[:, :split_pt], img[:, split_pt:]
        
        c1, w1, h1, a1 = crop_alpha(p1)
        c2, w2, h2, a2 = crop_alpha(p2)
        
        # The symbol is typically more square (aspect closer to 1), text is wide (aspect > 2)
        if a1 < a2:
            cv2.imwrite('public/simbolo_hackteck.png', c1)
            cv2.imwrite('public/texto_hackteck.png', c2)
        else:
            cv2.imwrite('public/simbolo_hackteck.png', c2)
            cv2.imwrite('public/texto_hackteck.png', c1)
        print("Split horizontally")
    else:
        print("No horizontal gap found")
else: # Vertical arrangement
    proj = np.sum(thresh, axis=1)
    non_empty = np.where(proj > 0)[0]
    gaps = []
    for i in range(len(non_empty)-1):
        if non_empty[i+1] - non_empty[i] > 5:
            gaps.append((non_empty[i], non_empty[i+1], non_empty[i+1]-non_empty[i]))
            
    if gaps:
        gaps.sort(key=lambda x: x[2], reverse=True)
        split_pt = (gaps[0][0] + gaps[0][1]) // 2
        p1, p2 = img[:split_pt, :], img[split_pt:, :]
        
        c1, w1, h1, a1 = crop_alpha(p1)
        c2, w2, h2, a2 = crop_alpha(p2)
        
        if a1 < a2:
            cv2.imwrite('public/simbolo_hackteck.png', c1)
            cv2.imwrite('public/texto_hackteck.png', c2)
        else:
            cv2.imwrite('public/simbolo_hackteck.png', c2)
            cv2.imwrite('public/texto_hackteck.png', c1)
        print("Split vertically")
    else:
        print("No vertical gap found")
