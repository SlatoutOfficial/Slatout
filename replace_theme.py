import os
import re

TARGET_DIR = "/home/tarun/projects/slatout-agency/src"

REPLACEMENTS = [
    (r"#2563EB", r"#F26522"),
    (r"#2563eb", r"#F26522"),
    (r"37,99,235", r"242,101,34"),
    (r"37, 99, 235", r"242, 101, 34"),
    (r"#38BDF8", r"#FE7004"),
    (r"#38bdf8", r"#FE7004"),
    (r"bg-blue-(\d+)", r"bg-orange-\1"),
    (r"text-blue-(\d+)", r"text-orange-\1"),
    (r"border-blue-(\d+)", r"border-orange-\1"),
    (r"fill-blue-(\d+)", r"fill-orange-\1"),
    (r"border-orange-105", r"border-orange-100")
]

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in REPLACEMENTS:
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts") or file.endswith(".css"):
            process_file(os.path.join(root, file))

