import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

old_marquee = """
              <div className="marquee__part font-archivo" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
"""
new_marquee = """
              <div className="marquee__part font-archivo" key={idx} style={{ color: marqueeTextColor }}>
                <span className="marquee-text-inner">
                  {match && customColor ? (
                    <>
                      <span>{match[1]}</span>
                      <span style={{ color: customColor }}>{match[2]}</span>
                    </>
                  ) : (
                    <span style={{ color: customColor || 'inherit' }}>{text}</span>
                  )}
                </span>
"""
content = content.replace(old_marquee.strip(), new_marquee.strip())

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)
