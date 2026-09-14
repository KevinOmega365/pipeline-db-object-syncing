const bannerWidth = 80

const repeateCharacter = (count, character) =>
Array(count).fill(character).join('')

export const banner = (text, tabs = '') =>
{
    const dashCount = bannerWidth - 2 - text.length - 2 - tabs.length
    
    return `${tabs}${repeateCharacter(dashCount, '-')} ${text} --`
}

export const placeholderStartBanner = (tabs = '') =>
{
    const commentStart = '-- '
    const paddedText = ' placeholder '
    const bracketCount = bannerWidth - tabs.length - commentStart.length - paddedText.length - 2

    return tabs + commentStart + repeateCharacter(bracketCount, '>') + paddedText + '>>'
}

export const placeholderEndBanner = (tabs = '') =>
{
    const commentStart = '-- '
    const paddedText = ' placeholder '
    const bracketCount = bannerWidth - tabs.length - commentStart.length - paddedText.length - 2

    return tabs + commentStart + repeateCharacter(bracketCount, '<') + paddedText + '<<'
}

export const bigBanner = (text, tabs = '') =>
{
    const dashCount = bannerWidth - tabs.length

    return tabs + repeateCharacter(dashCount, '-') + '\n' +
        banner(text, tabs) + '\n' +
        tabs + repeateCharacter(dashCount, '-')
}
    
export const tab = (tabCount) => repeateCharacter(4 * tabCount, ' ')

export const tabIn = (tabCount) => (text) => tab(tabCount) + text