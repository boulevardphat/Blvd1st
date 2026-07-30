import re

with open('src/components/FlowingMenu.tsx', 'r') as f:
    content = f.read()

# Replace the beginning of handleMouseEnter
old_enter_start = """
  const handleMouseEnter = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.touches && ev.touches.length > 0) {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const isTouch = ev.type.startsWith('touch');
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);
"""

new_enter_start = """
  const lastTouchTime = useRef(0);

  const handleMouseEnter = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    if (ev.type.startsWith('touch')) {
      lastTouchTime.current = Date.now();
    } else if (Date.now() - lastTouchTime.current < 500) {
      // Ignore simulated mouse events right after touch
      return;
    }

    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.touches && ev.touches.length > 0) {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Always use 'bottom' for touch devices to ensure consistent animation direction
    // regardless of where on the item the user tapped.
    const isTouch = ev.type.startsWith('touch') || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);
"""

content = content.replace(old_enter_start.strip(), new_enter_start.strip())

# Replace the beginning of handleMouseLeave
old_leave_start = """
  const handleMouseLeave = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.changedTouches && ev.changedTouches.length > 0) {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const isTouch = ev.type.startsWith('touch');
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);
"""

new_leave_start = """
  const handleMouseLeave = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    if (ev.type.startsWith('mouse') && Date.now() - lastTouchTime.current < 500) {
      // Ignore simulated mouse events right after touch
      return;
    }

    const rect = (itemRef.current as any).getBoundingClientRect();
    let clientX = ev.clientX;
    let clientY = ev.clientY;

    if (ev.changedTouches && ev.changedTouches.length > 0) {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const isTouch = ev.type.startsWith('touch') || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const edge = isTouch ? 'bottom' : findClosestEdge(x, y, rect.width, rect.height);
"""

content = content.replace(old_leave_start.strip(), new_leave_start.strip())

with open('src/components/FlowingMenu.tsx', 'w') as f:
    f.write(content)
