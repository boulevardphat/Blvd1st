import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# Fix handleMouseEnter
old_enter = """
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };
"""

new_enter = """
    const isTouch = ev.type.startsWith('touch');
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);

    if (dimOnHover) {
      gsap.to(itemRef.current, { opacity: 0.3, duration: 0.3 });
    }

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };
"""
content = content.replace(old_enter.strip(), new_enter.strip())

# Fix handleMouseLeave
old_leave = """
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };
"""

new_leave = """
    const isTouch = ev.type.startsWith('touch');
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);

    if (dimOnHover) {
      gsap.to(itemRef.current, { opacity: 1, duration: 0.3 });
    }

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };
"""
content = content.replace(old_leave.strip(), new_leave.strip())

# Add custom color and hover text
content = content.replace("function MenuItem({ link, text, image, onClick, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }: any) {", "function MenuItem({ link, text, image, onClick, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, customColor, hoverText, dimOnHover }: any) {")

# Update textColor to customColor if exists
content = content.replace("style={{ color: textColor }}", "style={{ color: customColor || textColor }}")

# Update span text to hoverText if exists
content = content.replace("<span>{text}</span>", "<span>{hoverText || text}</span>")

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)
