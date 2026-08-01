import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace mobile height
content = content.replace('h-[50vh] bg-[#000000]', 'h-[80vh] bg-[#000000]')

# Replace image placeholder with img tag
old_image = '<div className="w-[clamp(4rem,10vw,6rem)] h-[clamp(4rem,10vw,6rem)] bg-white/5 rounded-md mb-2"></div>'
new_image = '<img src="https://i.ibb.co/TxrtFvPZ/info.webp" alt="Phat Nguyen Thuan" className="w-[clamp(4rem,12vw,7rem)] h-[clamp(4rem,12vw,7rem)] object-cover rounded-sm mb-2" referrerPolicy="no-referrer" />'
content = content.replace(old_image, new_image)

with open('src/App.tsx', 'w') as f:
    f.write(content)
