import sys

with open('src/components/PortraitContactScreen.tsx', 'r') as f:
    content = f.read()

imports = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, AtSign, Copy, Check } from 'lucide-react';

"""

with open('src/components/PortraitContactScreen.tsx', 'w') as f:
    f.write(imports + content + "\nexport default PortraitContactScreen;\n")

# Same for LandscapeContactScreen
with open('src/components/LandscapeContactScreen.tsx', 'r') as f:
    content = f.read()

with open('src/components/LandscapeContactScreen.tsx', 'w') as f:
    f.write(imports + content + "\nexport default LandscapeContactScreen;\n")
