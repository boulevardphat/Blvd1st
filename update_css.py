import re

with open('src/index.css', 'r') as f:
    content = f.read()

font_faces = """
@font-face {
  font-family: 'Turista';
  src: url('/fonts/turista.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'ArialCustom';
  src: url('/fonts/arial.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Vespertine';
  src: url('/fonts/vespertine.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
"""

if "font-family: 'Turista'" not in content:
    content = font_faces.strip() + "\n\n" + content

theme_vars = """
  --font-archivo: "Archivo", sans-serif;
  --font-be-vietnam: "Be Vietnam Pro", sans-serif;
  --font-turista: "Turista", sans-serif;
  --font-arial: "ArialCustom", "Arial", sans-serif;
  --font-vespertine: "Vespertine", sans-serif;
"""

content = re.sub(
    r'--font-archivo: "Archivo", sans-serif;\s*--font-be-vietnam: "Be Vietnam Pro", sans-serif;',
    theme_vars.strip(),
    content
)

with open('src/index.css', 'w') as f:
    f.write(content)
