import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace state definitions
content = re.sub(
    r"const \[activeLandscapeTab, setActiveLandscapeTab\] = useState<[^>]+>\(null\);\n\s*const \[activePortraitTab, setActivePortraitTab\] = useState<[^>]+>\(null\);",
    "const [activeTab, setActiveTab] = useState<'contact' | 'info' | 'history' | 'booking' | 'friends' | 'archive' | null>(null);",
    content
)

# Replace all setActiveLandscapeTab and setActivePortraitTab
content = content.replace("setActiveLandscapeTab(", "setActiveTab(")
content = content.replace("setActivePortraitTab(", "setActiveTab(")

# Replace isOpenLandscape and isOpenPortrait in SlideTabs
content = re.sub(r"isOpenLandscape=\{activeLandscapeTab === '([^']+)'\}", r"isOpenLandscape={activeTab === '\1'}", content)
content = re.sub(r"isOpenPortrait=\{activePortraitTab === '([^']+)'\}", r"isOpenPortrait={activeTab === '\1'}", content)

# Remove duplicate setActiveTab(null); calls in onClose handlers
content = content.replace("setActiveTab(null);\n          setActiveTab(null);", "setActiveTab(null);")

# Update isAnyPopupOpen
content = content.replace("activeLandscapeTab !== null || activePortraitTab !== null", "activeTab !== null")

# Update shiftLeft prop
content = content.replace("shiftLeft={activeLandscapeTab !== null}", "shiftLeft={activeTab !== null}")

with open('src/App.tsx', 'w') as f:
    f.write(content)

