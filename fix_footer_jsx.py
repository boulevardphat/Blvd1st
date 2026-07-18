import sys

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

content = content.replace("    {/* Flat Solid Black", "    <>\n      {/* Flat Solid Black")
content = content.replace("    </div>\n  );\n};", "    </div>\n    </>\n  );\n};")

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)
