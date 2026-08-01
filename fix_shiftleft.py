import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add isLandscape state
content = content.replace(
    "const [imagesLoaded, setImagesLoaded] = useState(false);",
    "const [imagesLoaded, setImagesLoaded] = useState(false);\n  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);"
)

# Update setIsLandscape in setVh
setvh_block = """    const setVh = () => {
      // Recalculate if width changes (rotation/resize) OR height changes significantly (split-screen/keyboard > 150px)
      // but ignore small height changes (URL bar hide/show)
      if (
        window.innerWidth !== lastWidth ||
        Math.abs(window.innerHeight - lastHeight) > 150 ||
        !document.documentElement.style.getPropertyValue('--vh')
      ) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
        setIsLandscape(window.innerWidth > window.innerHeight);
      }
    };"""

content = re.sub(r"    const setVh = \(\) => \{.*?\    \};\n", setvh_block + '\n', content, flags=re.DOTALL)

# Update shiftLeft to only be true in landscape
content = content.replace("shiftLeft={activeTab !== null}", "shiftLeft={activeTab !== null && isLandscape}")

with open('src/App.tsx', 'w') as f:
    f.write(content)

