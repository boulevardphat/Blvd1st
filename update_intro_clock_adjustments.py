import re

with open('src/components/IntroClock.tsx', 'r') as f:
    content = f.read()

# 1. Normal speed reverse
content = content.replace("nowMs = startTimeMs - (diff * 5);", "nowMs = startTimeMs - diff;")
content = content.replace("// Run backwards 5x faster to make it noticeable", "// Run backwards at normal speed")

# 2. Mirrored only horizontally
content = content.replace("if (mode === 'mirrored') return 'scaleY(-1) scaleX(-1)';", "if (mode === 'mirrored') return 'scaleX(-1)';")

# 3. Multiple rows closer and more
# Adjust gap
content = content.replace("gap-[calc(var(--vh,1vh)*1.8)] landscape:gap-[calc(var(--vh,1vh)*4.5)]", "gap-[calc(var(--vh,1vh)*0.5)] landscape:gap-[calc(var(--vh,1vh)*1.5)]")
# Adjust count
content = content.replace("Array.from({ length: 9 }).map", "Array.from({ length: 25 }).map")

with open('src/components/IntroClock.tsx', 'w') as f:
    f.write(content)
