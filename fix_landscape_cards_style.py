import sys

with open('src/components/LandscapeContactScreen.tsx', 'r') as f:
    content = f.read()

# Make cards smaller and square-ish
content = content.replace('w-64 h-48', 'w-40 h-40')
# Make card 3's Copy icon rotate 12 degrees
content = content.replace(
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors" />',
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors" />',
    1 # First replacement (Card 2)
)

# Rotate for card 3
content = content.replace(
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors" />',
    '<Copy strokeWidth={1.5} className="w-8 h-8 text-white group-hover:text-[#89CC04] transition-colors rotate-12" />'
)

with open('src/components/LandscapeContactScreen.tsx', 'w') as f:
    f.write(content)
