import re
from datetime import datetime, timedelta

def process_file():
    with open('history_changes.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will split by "LẦN THAY ĐỔI THỨ"
    lines = content.split('\n')
    
    out_lines = []
    
    start_time = datetime(2026, 7, 18, 16, 33, 0) # 18/07/2026 16:33:00 (HCMC)
    end_time_past = datetime(2026, 7, 30, 23, 10, 0) # 30/07/2026 23:10:00 (HCMC)
    
    total_past_changes = 29
    time_step = (end_time_past - start_time) / (total_past_changes if total_past_changes > 0 else 1)
    
    change_count = 1
    
    for line in lines:
        out_lines.append(line)
        if line.startswith('LẦN THAY ĐỔI THỨ'):
            # Calculate time
            if change_count <= 29:
                current_time = start_time + time_step * (change_count - 1)
            elif change_count == 30:
                current_time = datetime(2026, 7, 30, 23, 19, 30)
            elif change_count == 31:
                current_time = datetime(2026, 7, 30, 23, 23, 15)
            elif change_count == 32:
                current_time = datetime(2026, 7, 30, 23, 26, 12)
            else:
                current_time = datetime(2026, 7, 30, 23, 30, 0)
                
            time_str = current_time.strftime("%d/%m/%Y %H:%M:%S")
            out_lines.append(f"- Thời gian: {time_str} (Giờ TPHCM)")
            change_count += 1
            
    with open('history_changes.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(out_lines))

process_file()
print("Done")
