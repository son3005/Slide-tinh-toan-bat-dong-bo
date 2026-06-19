import os
import re

slides_dir = r'e:\University\Year 3-3\Song song\baocao\web-presentation\slides'

img_map = {
    'Phần 1': 'red_chrome_part1_transparent.png',
    'Phần 2': 'red_chrome_part2_transparent.png',
    'Phần 3': 'red_chrome_part3_transparent.png',
    'Phần 4': 'red_chrome_part4_transparent.png',
    'Phần 5': 'red_chrome_part5_transparent.png',
}

for f_name in os.listdir(slides_dir):
    if not f_name.endswith('.html'): continue
    path = os.path.join(slides_dir, f_name)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Revert wrong images back to text
    content = re.sub(r'<img[^>]*src="images/red_chrome_event_loop[^"]*"[^>]*>', '<h1>Phần 2: Asyncio (Đơn luồng)</h1>', content)
    content = re.sub(r'<img[^>]*src="images/red_chrome_thread_process[^"]*"[^>]*>', '<h1>Phần 3: Concurrent (Đa luồng/Đa tiến trình)</h1>', content)
    content = re.sub(r'<img[^>]*src="images/red_chrome_super_dashboard[^"]*"[^>]*>', '<h1>Phần 3: Concurrent (Đa luồng/Đa tiến trình)</h1>', content)
    content = re.sub(r'<img[^>]*src="images/red_chrome_coroutines[^"]*"[^>]*>', '<h1 class="gradient-text">1. Coroutine (Hàm Bất Đồng Bộ)</h1>', content)
    content = re.sub(r'<img[^>]*src="images/red_chrome_summary[^"]*"[^>]*>', '<h1>Phần 5: Tổng kết & Thảo luận</h1>', content)

    # Now replace <h1> containing Phần X with the new correct images
    for key, img in img_map.items():
        pattern = r'<h1[^>]*>.*?(' + key + r').*?</h1>'
        replacement = f'<img src="images/{img}" alt="{key}" class="slide-title-img">'
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE | re.DOTALL)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
print('HTML replacement complete!')
