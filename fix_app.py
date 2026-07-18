import sys
import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import LandscapeContactScreen from './components/LandscapeContactScreen';
import PortraitContactScreen from './components/PortraitContactScreen';
import DecryptedText from './components/DecryptedText';
"""
content = content.replace("import { Facebook, Instagram, AtSign, Check, Copy } from 'lucide-react';", 
                          "import { Facebook, Instagram, AtSign, Check, Copy } from 'lucide-react';\n" + imports)

# Remove DecryptedText
content = re.sub(r'// --- Decrypted Text Component ---.*?const DecryptedText =.*?return <span>\{display \|\| \'\\u00A0\'\}</span>;\n\};\n', '', content, flags=re.DOTALL)

# Remove LandscapeContactScreen
content = re.sub(r'// --- Landscape Contact Screen Component.*?const LandscapeContactScreen =.*?// --- Portrait Contact Screen Component', '// --- Portrait Contact Screen Component', content, flags=re.DOTALL)

# Remove PortraitContactScreen
content = re.sub(r'// --- Portrait Contact Screen Component.*?const PortraitContactScreen =.*?(?=export default function App)', '', content, flags=re.DOTALL)

# Fix snap jitter
content = content.replace('overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory', 'overflow-y-auto no-scrollbar scroll-smooth')
content = content.replace('snap-start snap-always', '')
content = content.replace('snap-end snap-always', '')

with open('src/App.tsx', 'w') as f:
    f.write(content)
