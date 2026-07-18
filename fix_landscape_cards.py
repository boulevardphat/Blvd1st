import sys

with open('src/components/LandscapeContactScreen.tsx', 'r') as f:
    content = f.read()

# Card 1
content = content.replace(
    '<span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase">Socials</span>',
    ''
)

# Card 2
content = content.replace(
    '<span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-white/80">Cá Nhân</span>',
    ''
)
content = content.replace(
    '<span className="font-mono text-xs text-white/70 tracking-tight mt-2 opacity-0 group-hover:opacity-100 transition-opacity">thuanphat2609...</span>',
    ''
)

# Card 3
content = content.replace(
    '<span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-white/80">Học Tập</span>',
    ''
)
content = content.replace(
    '<span className="font-mono text-xs text-white/70 tracking-tight mt-2 opacity-0 group-hover:opacity-100 transition-opacity">phatnt.a2.2326...</span>',
    ''
)

with open('src/components/LandscapeContactScreen.tsx', 'w') as f:
    f.write(content)
