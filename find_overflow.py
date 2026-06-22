import re

with open("c:/Users/user/Documents/GitHub/tailwind-4/portfolio/test.html", "r", encoding="utf-8") as f:
    text = f.read()

# Find any classes with fixed large widths or negative margins
suspects = []

for line_num, line in enumerate(text.splitlines(), 1):
    if re.search(r'w-\[\d{3,}px\]', line):
        suspects.append(f"Line {line_num} (w-[xxxpx]): {line.strip()}")
    if re.search(r'min-w-\[\d{3,}px\]', line):
        suspects.append(f"Line {line_num} (min-w): {line.strip()}")
    if re.search(r'w-[7-9]\d', line):
        suspects.append(f"Line {line_num} (w-large): {line.strip()}")
    if re.search(r'class=".*?-m[lx].*?"', line):
        suspects.append(f"Line {line_num} (negative margin): {line.strip()}")

print("Suspects found:", len(suspects))
for s in suspects:
    print(s)
