import re

with open('src/App.tsx', 'r') as f:
    app = f.read()

# Update SceneState
app = app.replace("  | 'intro-clock-reverse' \n  | 'intro-clock-mirrored' ", "  | 'intro-clock-reverse-mirrored' ")

# Update timeouts
timeouts_old = """
    if (scene === 'intro-clock-normal') {
      const t = setTimeout(() => {
        setScene('intro-clock-reverse');
      }, 600); // KC3
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-reverse') {
      const t = setTimeout(() => {
        setScene('intro-clock-mirrored');
      }, 600); // KC4
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-mirrored') {
      const t = setTimeout(() => {
        setScene('intro-clock-multiple');
      }, 600); // KC5
      return () => clearTimeout(t);
    }
"""
timeouts_new = """
    if (scene === 'intro-clock-normal') {
      const t = setTimeout(() => {
        setScene('intro-clock-reverse-mirrored');
      }, 600); // KC3
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-reverse-mirrored') {
      const t = setTimeout(() => {
        setScene('intro-clock-multiple');
      }, 600); // KC4
      return () => clearTimeout(t);
    }
"""
app = app.replace(timeouts_old.strip(), timeouts_new.strip())

# Update rendering
render_old = """
      {/* KC4: Reverse clock */}
      {scene === 'intro-clock-reverse' && <IntroClock mode="reverse" />}
      {/* KC5: Mirrored clock */}
      {scene === 'intro-clock-mirrored' && <IntroClock mode="mirrored" />}
"""
render_new = """
      {/* KC4: Reverse and mirrored clock */}
      {scene === 'intro-clock-reverse-mirrored' && <IntroClock mode="reverse-mirrored" />}
"""
app = app.replace(render_old.strip(), render_new.strip())

with open('src/App.tsx', 'w') as f:
    f.write(app)


with open('src/components/IntroClock.tsx', 'r') as f:
    clock = f.read()

clock = clock.replace("mode?: 'normal' | 'reverse' | 'mirrored' | 'multiple';", "mode?: 'normal' | 'reverse-mirrored' | 'multiple';")
clock = clock.replace("if (mode === 'reverse') {", "if (mode === 'reverse-mirrored') {")
clock = clock.replace("if (mode === 'mirrored') return 'scaleX(-1)';", "if (mode === 'reverse-mirrored') return 'scaleX(-1)';")

with open('src/components/IntroClock.tsx', 'w') as f:
    f.write(clock)

