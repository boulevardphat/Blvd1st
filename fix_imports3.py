import sys

with open('src/components/DecryptedText.tsx', 'r') as f:
    content = f.read()

imports = """import React, { useEffect, useState } from 'react';

"""

with open('src/components/DecryptedText.tsx', 'w') as f:
    f.write(imports + content + "\nexport default DecryptedText;\n")
