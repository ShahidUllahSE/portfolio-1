const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'test.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Container fixed width replacements
html = html.replace(/w-\[1325px\]/g, 'w-full max-w-[1325px] mx-auto px-4 md:px-8');
html = html.replace(/w-\[1340px\]/g, 'w-full max-w-[1340px] mx-auto px-4 md:px-8');
html = html.replace(/w-\[1200px\]/g, 'w-full max-w-[1200px] mx-auto px-4 md:px-8');
html = html.replace(/w-\[920px\]/g, 'w-full max-w-[920px]');
html = html.replace(/w-\[790px\]/g, 'w-full max-w-[790px]');

// Fix body specifically
html = html.replace('<body class="bg-black h-full w-[1325px]">', '<body class="bg-black text-white h-full w-full overflow-x-hidden">');
html = html.replace('<body class="bg-black h-full w-full max-w-[1325px] mx-auto px-4 md:px-8">', '<body class="bg-black text-white h-full w-full overflow-x-hidden">');

// Flex direction adjustments & wrapping
html = html.replace(/flex justify-center items-center/g, 'flex flex-col md:flex-row justify-center items-center gap-6');
html = html.replace(/flex justify-start w-full mr-10/g, 'flex flex-col md:flex-row justify-start w-full');
html = html.replace(/flex  px-10 py-5 ml-10/g, 'flex flex-col md:flex-row px-4 md:px-10 py-5 md:ml-10');

html = html.replace(/flex  flex-row  ml-32  align-center justify-arround gap-10/g, 'flex flex-col md:flex-row flex-wrap md:ml-0 items-center justify-around gap-10');
html = html.replace(/flex flex-wrap justify-around gap-10 mx-10 mt-20/g, 'flex flex-wrap justify-center md:justify-around gap-10 mx-5 md:mx-10 mt-20');
html = html.replace(/flex justify-center gap-8 mx-5 mt-10/g, 'flex flex-wrap justify-center gap-8 mx-5 mt-10');
html = html.replace(/flex  justify-center gap-5 mt-10/g, 'flex flex-wrap justify-center gap-5 mt-10');
html = html.replace(/flex w-\[920px\]  h-56  ml-32 gap-4 mt-10/g, 'flex flex-col md:flex-row w-full max-w-[920px] h-auto md:h-56 md:ml-10 gap-4 mt-10 items-center text-center md:text-left');
html = html.replace(/flex items-center gap-4 ml-20 mt-5/g, 'flex flex-col md:flex-row items-center gap-4 md:ml-20 mt-5');
html = html.replace(/flex justify-center w-full mr-40 text-white/g, 'flex flex-col md:flex-row justify-center w-full md:mr-40 text-white gap-6 items-center');
html = html.replace(/flex justify-center w-auto  ml-10/g, 'flex flex-col md:flex-row justify-center w-auto gap-6');


// Margin fixes via regex
function makeClsResponsive(clsName, replacement, text) {
    const regex = new RegExp(`\\b${clsName}\\b`, 'g');
    return text.replace(regex, replacement);
}

const margins = ['ml-32', 'ml-20', 'ml-10', 'mr-10', 'ml-14', 'ml-5', 'ml-16', 'ml-96', 'mr-40'];
margins.forEach(m => {
    html = makeClsResponsive(m, `md:${m}`, html);
});

// Make specific widths responsive for flex children
const widths = ['w-80', 'w-92', 'w-64'];
widths.forEach(w => {
    html = makeClsResponsive(w, `w-full max-w-[320px] md:${w}`, html);
});

// Center alignment properties that need to be reset
html = html.replace('text px-5 md:ml-14 w-full text-left', 'text px-5 md:ml-14 w-full text-center md:text-left');
html = html.replace('text-center w-full text-lg md:ml-5', 'text-center md:text-left w-full text-lg md:ml-5');

// Progress circles overflow
html = html.replace(/flex flex-col items-center relative h-48/g, 'flex flex-col items-center relative h-48 w-full md:w-auto mt-10 md:mt-0');

// Nav lists
html = html.replace('<ul class="flex items-center gap-4">', '<ul class="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">');
html = html.replace('<div class=" flex items-end gap-4  md:ml-96 mb-5">', '<div class="flex items-center justify-center gap-4 mt-4 lg:mt-0 md:ml-auto mb-5">');
html = html.replace(/ml-38/g, 'mx-auto md:ml-38');
html = html.replace(/\bw-68\b/g, 'w-full md:w-68 px-4 md:px-0');

// Responsive images inside grid/flex items
html = html.replace('<img src="https://quomodosoft.com/html/glint/assets/img/project/project3.png "', '<img class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project3.png "');
html = html.replace('class=" " src="https://quomodosoft.com/html/glint/assets/img/project/project4.png"', 'class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project4.png"');
html = html.replace('class=" " src="https://quomodosoft.com/html/glint/assets/img/project/project2.png"', 'class="w-full max-w-[400px] object-cover" src="https://quomodosoft.com/html/glint/assets/img/project/project2.png"');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done replacing strings in html.');
