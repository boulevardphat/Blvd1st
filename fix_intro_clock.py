import re

with open('src/components/IntroClock.tsx', 'r') as f:
    content = f.read()

# Make IntroClock accept props
component_def = """
export interface IntroClockProps {
  mode?: 'normal' | 'reverse' | 'mirrored' | 'multiple';
}

export const IntroClock: React.FC<IntroClockProps> = ({ mode = 'normal' }) => {
"""

content = re.sub(r'export const IntroClock = \(\) => \{', component_def.strip(), content)

# Inside useEffect, capture start time for reverse mode
effect_start = """
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const startTimeMs = Date.now();
"""
content = re.sub(r'const \[timeStr, setTimeStr\] = useState\(\'\'\);\n\s*useEffect\(\(\) => \{', effect_start.strip(), content)

# updateClock logic
old_update = """
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);
"""
new_update = """
      let nowMs = Date.now();
      if (mode === 'reverse') {
        const diff = nowMs - startTimeMs;
        // Run backwards 5x faster to make it noticeable
        nowMs = startTimeMs - (diff * 5); 
      }
      const now = new Date(nowMs);
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);
"""
content = content.replace(old_update.strip(), new_update.strip())

# Add mode to dependency array
content = re.sub(r'\}, \[\]\);', '}, [mode]);', content)

# Render logic
old_render = """
  return (
    <div 
      id="scene-clock"
      className="absolute inset-0 flex items-center justify-center bg-black z-30 select-none"
    >
      <div 
        id="clock-display"
        className="font-archivo font-normal text-[clamp(1.4rem,4.2vw,3.8rem)] text-white/95 tracking-[0.05em] select-none pointer-events-none tabular-nums"
      >
        {timeStr}
      </div>
    </div>
  );
"""

new_render = """
  const getTransform = () => {
    if (mode === 'mirrored') return 'scaleY(-1) scaleX(-1)';
    return 'none';
  };

  const ClockDisplay = () => (
    <div 
      className="font-archivo font-normal text-[clamp(1.4rem,4.2vw,3.8rem)] text-white/95 tracking-[0.05em] select-none pointer-events-none tabular-nums"
      style={{ transform: getTransform() }}
    >
      {timeStr}
    </div>
  );

  return (
    <div 
      id="scene-clock"
      className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 select-none overflow-hidden gap-[calc(var(--vh,1vh)*1.8)] landscape:gap-[calc(var(--vh,1vh)*4.5)]"
    >
      {mode === 'multiple' ? (
        Array.from({ length: 9 }).map((_, i) => (
          <ClockDisplay key={i} />
        ))
      ) : (
        <ClockDisplay />
      )}
    </div>
  );
"""
content = content.replace(old_render.strip(), new_render.strip())

with open('src/components/IntroClock.tsx', 'w') as f:
    f.write(content)
