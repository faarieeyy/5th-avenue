import cv2
import os

video_path = "public/207787_gwr_video_mvp.mp4"
output_dir = "public/hero-frames"

os.makedirs(output_dir, exist_ok=True)

# Clear existing frames
for f in os.listdir(output_dir):
    os.remove(os.path.join(output_dir, f))

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

print(f"Extracting all {total_frames} frames consecutively...")

extracted_count = 0

for i in range(total_frames):
    ret, frame = cap.read()
    if ret:
        height, width = frame.shape[:2]
        if width > 1920:
            scale = 1920 / width
            frame = cv2.resize(frame, (1920, int(height * scale)))
        
        out_path = os.path.join(output_dir, f"frame_{i+1:04d}.webp")
        # Use high quality for webp
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 90])
        extracted_count += 1
    else:
        break

cap.release()
print(f"Done extracting {extracted_count} frames.")
