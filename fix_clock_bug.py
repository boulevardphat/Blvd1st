import re

with open('src/components/IntroClock.tsx', 'r') as f:
    content = f.read()

content = content.replace('const nowMs = now.getTime();', 'const currentNowMs = now.getTime();')
content = content.replace('const currentTickStep = Math.floor(nowMs / 125);', 'const currentTickStep = Math.floor(currentNowMs / 125);')

with open('src/components/IntroClock.tsx', 'w') as f:
    f.write(content)
