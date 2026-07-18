import sys

with open('src/components/LandscapeContactScreen.tsx', 'r') as f:
    content = f.read()

# Replace the first rotate-12 with no rotate
content = content.replace(
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors rotate-12" />',
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors" />',
    1
)

with open('src/components/LandscapeContactScreen.tsx', 'w') as f:
    f.write(content)
