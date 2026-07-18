import sys
content = open('src/App.tsx').read()
type_def = "type SceneState = 'intro-play' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';\n\n"
content = content.replace("export default function App() {", type_def + "export default function App() {")
with open('src/App.tsx', 'w') as f:
    f.write(content)
