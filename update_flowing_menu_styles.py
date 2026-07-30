import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# 1. Fix dimOnHover duration to 0
content = content.replace("gsap.to(itemRef.current, { opacity: 0.5, duration: 0.3 });", "gsap.to(itemRef.current, { opacity: 0.5, duration: 0 });")
content = content.replace("gsap.to(itemRef.current, { opacity: 1, duration: 0.3 });", "gsap.to(itemRef.current, { opacity: 1, duration: 0 });")

# 2. Text styling logic
parser_logic = """
  const match = typeof text === 'string' ? text.match(/^(#BLVD)(\\d+)$/) : null;

  return (
    <div className="menu__item"
"""
content = re.sub(r'return \(\s*<div className="menu__item"', lambda m: parser_logic.strip(), content)

# 3. Fix button style
content = content.replace("style={{ color: customColor || textColor }}", "style={{ color: textColor }}")

# 4. Fix desktop-text span
old_desktop_text = '<span className="desktop-text" aria-hidden="true">{text}</span>'
new_desktop_text = """
        <span className="desktop-text" aria-hidden="true">
          {match && customColor ? (
            <>
              <span>{match[1]}</span>
              <span style={{ color: customColor }}>{match[2]}</span>
            </>
          ) : (
            <span style={{ color: customColor || textColor }}>{text}</span>
          )}
        </span>
"""
content = content.replace(old_desktop_text, new_desktop_text.strip())

# 5. Fix svg text
old_svg_text = """
          <text 
            x="50%" 
            y="54%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fill="currentColor" 
            fontWeight="900" 
            fontSize="100"
            textLength="900"
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </text>
"""
new_svg_text = """
          <text 
            x="50%" 
            y="54%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fill="currentColor" 
            fontWeight="900" 
            fontSize="100"
            textLength="900"
            lengthAdjust="spacingAndGlyphs"
          >
            {match && customColor ? (
              <>
                <tspan>{match[1]}</tspan>
                <tspan fill={customColor}>{match[2]}</tspan>
              </>
            ) : (
              <tspan fill={customColor || 'currentColor'}>{text}</tspan>
            )}
          </text>
"""
content = content.replace(old_svg_text.strip(), new_svg_text.strip())

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)
