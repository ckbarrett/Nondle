
# Import the necessary libraries
from PIL import Image
import numpy as np
import cv2
import argparse
import math

vertical_pixels = 15
pixelThreshold = 215
 
def blackOrWhite(pixel):
    if pixel > (pixelThreshold):
        return 255
    else:
        return 0

def transformForOutput(pixel):
    if pixel == 0:
        return 1
    else:
        return 0

parser = argparse.ArgumentParser(description='Generate nonograms from images')
parser.add_argument('filename')
args = parser.parse_args()

# load the image and convert into 
img = cv2.imread(f"../source_images/{args.filename}", cv2.IMREAD_COLOR)
height, width, channels = img.shape
ratio = width / height
horizontal_pixels = math.floor(vertical_pixels * ratio)
# convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# convert to black and white
(thresh, im_bw) = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
# shrink to our desired size
shrink = cv2.resize(im_bw, (horizontal_pixels, vertical_pixels), 
               interpolation = cv2.INTER_AREA)
# force to black or white
func1 = np.vectorize(blackOrWhite)
im_255or0 = func1(shrink)
outputImage = np.uint8(im_255or0)

# encode as 1 or 0 for output file
func2 = np.vectorize(transformForOutput)
im_1or0 = func2(im_255or0)

#strip outside 

# write to file
f = open(f'nonocount.txt', "r")
count = int(f.read())
np.savetxt(f'../nonograms/{count}.nono', im_1or0, delimiter=',', fmt='%1i')   # X is an array
f = open(f'nonocount.txt', "w")
f.write(str(count+1))
f.close()

# data
#print(im_1or0)
cv2.imshow('Cat', outputImage)
cv2.waitKey(0) 
cv2.destroyAllWindows()