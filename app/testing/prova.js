

let prova = 'https://www.youtube.com/watch?v=3mI9rm1IoUo'

let prova2 = 'https://youtu.be/3mI9rm1IoUo'

function getLink(string) {

    if (string.includes('https://www.youtube.com')) {
    let splitted = string.split(' ')
    let link = ''
    splitted.forEach(el => {
        if (el.includes('https://www.youtube.com/')) link = el.replace('watch?v=', 'embed/')
    });
    if (link.charAt(link.length - 1) === '.') link = link.slice(0, -1)
    return link
}
    return null
}

console.log(getLink(prova));