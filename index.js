import scraper from './src/scraper.js'

/**
 * @typedef {string} tikTokLink
 * @typedef {tikTokLink[]} tikTokLinkCollection
 * @param {string} tikTokUsername 
 * @param {number} scrollDistance 
 * 
 * @returns {Promise<tikTokLinkCollection>}
 */
export default function (tikTokUsername, scrollDistance) {
    return new Promise(async (resolve, reject) => {
        try {
            const links = await scraper(tikTokUsername, scrollDistance, false)
            resolve(links)
        } catch (e) {
            reject(e)
        }
    })
}