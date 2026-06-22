import os
import re

html_path = r"c:\Users\user\Documents\GitHub\tailwind-4\portfolio\test.html"

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Container fixed width replacements
html = html.replace('w-[1325px]', 'w-full max-w-[1325px] mx-auto px-4 md:px-8')
html = html.replace('w-[1340px]', 'w-full max-w-[1340px] mx-auto px-4 md:px-8')
html = html.replace('w-[1200px]', 'w-full max-w-[1200px] mx-auto px-4 md:px-8')
html = html.replace('w-[920px]', 'w-full max-w-[920px]')
html = html.replace('w-[790px]', 'w-full max-w-[790px]')

# 2. Fix body specifically
html = html.replace('<body class="bg-black h-full w-full max-w-[1325px] mx-auto px-4 md:px-8">', '<body class="bg-black h-full w-full overflow-x-hidden text-white">')

# 3. Flex direction adjustments & wrapping
html = html.replace('flex justify-center items-center', 'flex flex-col md:flex-row justify-center items-center gap-6')
html = html.replace('flex justify-start w-full mr-10', 'flex flex-col md:flex-row justify-start w-full')
html = html.replace('flex  px-10 py-5 ml-10', 'flex flex-col md:flex-row px-4 md:px-10 py-5')

html = html.replace('flex  flex-row  ml-32  align-center justify-arround gap-10', 'flex flex-col md:flex-row flex-wrap md:ml-0 items-center justify-around gap-10')
html = html.replace('flex flex-wrap justify-around gap-10 mx-10 mt-20', 'flex flex-wrap justify-center md:justify-around gap-10 mx-5 md:mx-10 mt-20')
html = html.replace('flex justify-center gap-8 mx-5 mt-10', 'flex flex-wrap justify-center gap-8 mx-5 mt-10')
html = html.replace('flex  justify-center gap-5 mt-10', 'flex flex-wrap justify-center gap-5 mt-10')
html = html.replace('flex justify-center gap-5 mt-10', 'flex flex-wrap justify-center gap-5 mt-10')
html = html.replace('flex w-[920px]  h-56  ml-32 gap-4 mt-10', 'flex flex-col md:flex-row w-full max-w-[920px] h-auto md:h-56 md:ml-10 gap-4 mt-10 items-center text-center md:text-left')
html = html.replace('flex items-center gap-4 ml-20 mt-5', 'flex flex-col md:flex-row items-center gap-4 md:ml-20 mt-5')
html = html.replace('flex justify-center w-full mr-40 text-white', 'flex flex-col lg:flex-row justify-center w-full md:mr-40 text-white gap-6 items-center')
html = html.replace('flex justify-center w-auto  ml-10', 'flex flex-col md:flex-row justify-center w-auto gap-6')


# 4. Margin fixes via regex (so we don't mess up non-bounded substrings)
def make_cls_responsive(cls_name, replacement, text):
    return re.sub(rf'\b{cls_name}\b', replacement, text)

# Convert horizontal margins to md: so they are zero/auto on mobile
for m in ['ml-32', 'ml-20', 'ml-10', 'mr-10', 'ml-14', 'ml-5', 'ml-16', 'ml-96', 'mr-40']:
    html = make_cls_responsive(m, f'md:{m}', html)

# 5. Make specific widths responsive for flex children
for w in ['w-80', 'w-92', 'w-64']:
    html = make_cls_responsive(w, f'w-full max-w-[320px] md:{w}', html)

# 6. Center alignment properties that need to be reset on larger screens or just specific adjustments
html = html.replace('text px-5 md:ml-14 w-full text-left', 'text px-5 md:ml-14 w-full text-center md:text-left')
html = html.replace('text-center w-full text-lg md:ml-5', 'text-center w-full text-lg md:text-left')

# Progress circles overflow
html = html.replace('flex flex-col items-center relative h-48', 'flex flex-col items-center relative h-48 w-full md:w-auto mt-10 md:mt-0')

# Nav lists
html = html.replace('<ul class="flex items-center gap-4">', '<ul class="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">')
html = html.replace('<div class=" flex items-end gap-4  md:ml-96 mb-5">', '<div class="flex items-center justify-center gap-4 mt-4 lg:mt-0 md:ml-auto mb-5">')
html = html.replace('ml-38', 'mx-auto md:ml-38')
html = re.sub(r'\bw-68\b', 'w-full md:w-68 px-4 md:px-0', html)

# 7. Additional flex containers missing wrap
html = html.replace('<div class="flex flex-col md:flex-row md:ml-32 align-center justify-arround gap-10 w-full max-w-[1200px] mx-auto px-4 md:px-8">', '<div class="flex flex-col md:flex-row md:ml-32 items-center justify-around gap-10 w-full max-w-[1200px] mx-auto px-4 flex-wrap">')

# 8. Responsive images inside grid/flex items
html = html.replace('<img src="https://quomodosoft.com/html/glint/assets/img/project/project3.png "', '<img class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project3.png "')
html = html.replace('class=" " src="https://quomodosoft.com/html/glint/assets/img/project/project4.png"', 'class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project4.png"')
html = html.replace('class=" " src="https://quomodosoft.com/html/glint/assets/img/project/project2.png"', 'class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project2.png"')


with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
