import json
import re

with open('/home/tarun/.gemini/antigravity/brain/133be220-9e47-492c-8a9a-a6c7565d6f9a/.system_generated/logs/overview.txt', 'r') as f:
    for line in f:
        if 'Write Hero.tsx' in line or 'write_to_file' in line:
            try:
                data = json.loads(line)
                args = data.get('tool_calls', [{}])[0].get('args', {})
                if args.get('TargetFile') == '"/home/tarun/projects/slatout-agency/src/components/Hero.tsx"':
                    print(args.get('CodeContent', '')[:1000])
                    break
            except:
                pass
