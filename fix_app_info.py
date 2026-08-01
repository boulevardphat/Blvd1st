import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_info = """        <div className="absolute top-[25%] left-[6.5%] right-[6.5%] flex flex-col gap-[clamp(2rem,5vw,4rem)] overflow-y-auto no-scrollbar pb-10 max-h-[70%]">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">name</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Phat Nguyen Thuan</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">blvd</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Boulevard</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">birth</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">26/09/2008</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">zodiac</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Libra ♎</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">mbti</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">INFP-T</span>
          </div>
        </div>"""

new_info = """        <div className="absolute top-[20%] left-[6.5%] right-[6.5%] flex flex-col gap-[clamp(1.2rem,3vw,2.5rem)] items-start overflow-y-auto no-scrollbar pb-10 max-h-[75%]">
          {/* Image placeholder */}
          <div className="w-[clamp(4rem,10vw,6rem)] h-[clamp(4rem,10vw,6rem)] bg-white/5 rounded-md mb-2"></div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">name</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Phat Nguyen Thuan</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">birth</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">26/09/2008</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">zodiac</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">Libra</span>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="font-sans text-white/50 text-[clamp(0.6rem,1.5vw,0.875rem)] uppercase tracking-[0.2em]">mbti</span>
            <span className="font-archivo text-white text-[clamp(1.5rem,4.5vw,3.5rem)] leading-none tracking-tight">INFP-T</span>
          </div>
        </div>"""

content = content.replace(old_info, new_info)

with open('src/App.tsx', 'w') as f:
    f.write(content)

