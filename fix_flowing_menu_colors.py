import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# 1. Update MenuItem props to include gradientColor
content = content.replace(
    "function MenuItem({ link, text, image, onClick, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, customColor, hoverText, dimOnHover }: any) {",
    "function MenuItem({ link, text, image, onClick, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, customColor, gradientColor, hoverText, dimOnHover }: any) {"
)

# 2. Fix desktop-text span to handle gradientColor
old_desktop_text = """
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
new_desktop_text = """
        <span className="desktop-text" aria-hidden="true">
          {match && customColor ? (
            <>
              <span>{match[1]}</span>
              <span style={gradientColor ? {
                background: `linear-gradient(to right, ${customColor}, ${gradientColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              } : { color: customColor }}>{match[2]}</span>
            </>
          ) : (
            <span style={{ color: textColor }}>{text}</span>
          )}
        </span>
"""
content = content.replace(old_desktop_text.strip(), new_desktop_text.strip())

# 3. Fix svg text to handle gradientColor
old_svg_text = """
        <svg 
          className="w-full h-full block mobile-svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 100"
          aria-hidden="true"
        >
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
        </svg>
"""
new_svg_text = """
        <svg 
          className="w-full h-full block mobile-svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 100"
          aria-hidden="true"
        >
          {gradientColor && (
            <defs>
              <linearGradient id={`grad-${text.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={customColor} />
                <stop offset="100%" stopColor={gradientColor} />
              </linearGradient>
            </defs>
          )}
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
                <tspan fill={gradientColor ? `url(#grad-${text.replace('#', '')})` : customColor}>{match[2]}</tspan>
              </>
            ) : (
              <tspan fill="currentColor">{text}</tspan>
            )}
          </text>
        </svg>
"""
content = content.replace(old_svg_text.strip(), new_svg_text.strip())

# 4. Fix marquee text to NOT use customColor (revert to just hoverText || text)
old_marquee = """
                <span className="marquee-text-inner">
                  {hoverText ? (
                    <span>{hoverText}</span>
                  ) : match && customColor ? (
                    <>
                      <span>{match[1]}</span>
                      <span style={{ color: customColor }}>{match[2]}</span>
                    </>
                  ) : (
                    <span style={{ color: customColor || 'inherit' }}>{text}</span>
                  )}
                </span>
"""
new_marquee = """
                <span className="marquee-text-inner">
                  <span>{hoverText || text}</span>
                </span>
"""
content = content.replace(old_marquee.strip(), new_marquee.strip())

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)
