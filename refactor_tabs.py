import re

content = open('src/App.tsx').read()

# Replace state variables
content = re.sub(
    r'const \[showInfo, setShowInfo\] = useState\(false\);\n\s*const \[showHistory, setShowHistory\] = useState\(false\);\n\s*const \[showHistoryDetail, setShowHistoryDetail\] = useState\(false\);\n\s*const \[showArchive, setShowArchive\] = useState\(false\);\n\s*const \[showFriends, setShowFriends\] = useState\(false\);\n\s*const \[showContactLandscape, setShowContactLandscape\] = useState\(false\);\n\s*const \[showContactPortrait, setShowContactPortrait\] = useState\(false\);',
    r"const [activeLandscapeTab, setActiveLandscapeTab] = useState<'contact' | 'info' | 'history' | null>(null);\n  const [activePortraitTab, setActivePortraitTab] = useState<'contact' | 'info' | 'history' | null>(null);\n  const [showHistoryDetail, setShowHistoryDetail] = useState(false);\n  const [showArchive, setShowArchive] = useState(false);\n  const [showFriends, setShowFriends] = useState(false);",
    content
)

# Replace isAnyPopupOpen
content = re.sub(
    r'const isAnyPopupOpen = showInfo \|\| showHistory \|\| showArchive \|\| showFriends \|\| showContactLandscape \|\| showContactPortrait;',
    r'const isAnyPopupOpen = activeLandscapeTab !== null || activePortraitTab !== null || showArchive || showFriends || showHistoryDetail;',
    content
)

# Replace Vespertine shiftLeft
content = content.replace('shiftLeft={showContactLandscape}', 'shiftLeft={activeLandscapeTab !== null}')
content = content.replace('{showContactPortrait && (', '{activePortraitTab !== null && (')
content = content.replace('{!(showContactLandscape || showContactPortrait) && (', '{!(activeLandscapeTab !== null || activePortraitTab !== null) && (')

# Landscape onClick replacements
content = re.sub(r'id="btn-contact-landscape"([^>]*?)onClick=\{\(\) => setShowContactLandscape\(true\)\}', r'id="btn-contact-landscape"\1onClick={() => setActiveLandscapeTab(\'contact\')}', content, flags=re.DOTALL)
content = re.sub(r'id="btn-history-landscape"([^>]*?)onClick=\{\(\) => setShowHistory\(true\)\}', r'id="btn-history-landscape"\1onClick={() => setActiveLandscapeTab(\'history\')}', content, flags=re.DOTALL)
content = re.sub(r'id="btn-info-landscape"([^>]*?)onClick=\{\(\) => setShowInfo\(true\)\}', r'id="btn-info-landscape"\1onClick={() => setActiveLandscapeTab(\'info\')}', content, flags=re.DOTALL)

# Portrait onClick replacements
content = re.sub(r'id="btn-contact-portrait"([^>]*?)onClick=\{\(\) => setShowContactPortrait\(true\)\}', r'id="btn-contact-portrait"\1onClick={() => setActivePortraitTab(\'contact\')}', content, flags=re.DOTALL)
content = re.sub(r'id="btn-history-portrait"([^>]*?)onClick=\{\(\) => setShowHistory\(true\)\}', r'id="btn-history-portrait"\1onClick={() => setActivePortraitTab(\'history\')}', content, flags=re.DOTALL)
content = re.sub(r'id="btn-info-portrait"([^>]*?)onClick=\{\(\) => setShowInfo\(true\)\}', r'id="btn-info-portrait"\1onClick={() => setActivePortraitTab(\'info\')}', content, flags=re.DOTALL)

open('src/App.tsx', 'w').write(content)
