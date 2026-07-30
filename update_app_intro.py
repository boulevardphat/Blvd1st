import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Update SceneState
scene_state_old = """
type SceneState = 
  | 'pre-intro' 
  | 'intro-play' 
  | 'intro-blvd' 
  | 'intro-clock' 
  | 'intro-image-1' 
  | 'intro-image-2' 
  | 'intro-image-3' 
  | 'main-app';
"""
scene_state_new = """
type SceneState = 
  | 'pre-intro' 
  | 'intro-play' 
  | 'intro-blvd' 
  | 'intro-clock-normal' 
  | 'intro-clock-reverse' 
  | 'intro-clock-mirrored' 
  | 'intro-clock-multiple' 
  | 'intro-image-1' 
  | 'intro-image-2' 
  | 'intro-image-3' 
  | 'main-app';
"""
content = content.replace(scene_state_old.strip(), scene_state_new.strip())

# Update setTimeout logic
timeouts_old = """
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 800); // 2.0s for KC3 (clock ticks) to be easily visible
      return () => clearTimeout(t);
    }
"""
timeouts_new = """
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock-normal');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
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
    if (scene === 'intro-clock-multiple') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 600); // KC6
      return () => clearTimeout(t);
    }
"""
content = content.replace(timeouts_old.strip(), timeouts_new.strip())

# Change image 1, 2, 3 delays to be faster if we want? The user said "các nhịp sau đó vẫn giữ nguyên" so keep them 500ms.
# Wait, user said "nhịp 6 là nhiều hàng... các nhịp sau đó vẫn giữ nguyên", so `intro-image-1` follows `intro-clock-multiple`.

# Update rendering
render_old = """
      {/* KC3: High-frequency live ticking clock */}
      {scene === 'intro-clock' && <IntroClock />}
"""
render_new = """
      {/* KC3: High-frequency live ticking clock */}
      {scene === 'intro-clock-normal' && <IntroClock mode="normal" />}
      {/* KC4: Reverse clock */}
      {scene === 'intro-clock-reverse' && <IntroClock mode="reverse" />}
      {/* KC5: Mirrored clock */}
      {scene === 'intro-clock-mirrored' && <IntroClock mode="mirrored" />}
      {/* KC6: Multiple clocks */}
      {scene === 'intro-clock-multiple' && <IntroClock mode="multiple" />}
"""
content = content.replace(render_old.strip(), render_new.strip())

with open('src/App.tsx', 'w') as f:
    f.write(content)
