import puppeteer from 'puppeteer'
import scroll from '@pierreminiggio/puppeteer-page-scroller'

/**
 * @param {string} tikTokUsername 
 * @param {number} scrollDistance 
 * @param {boolean} show 
 * 
 * @returns {Promise<string[]>}
 */
export default function (tikTokUsername, scrollDistance, show) {
    return new Promise(async (resolve, reject) => {

        let browser
        
        try {
            browser = await puppeteer.launch({
                headless: ! show,
                args: ['--no-sandbox']
            })
        } catch (e) {
            reject(e)
            return
        }
        
        try {
            const page = await browser.newPage()
            const userPage = 'https://www.tiktok.com/@' + tikTokUsername
            await page.goto(userPage + '?lang=fr')
            await scroll(page, scrollDistance)

            const html = await page.evaluate(() => document.body.outerHTML)
            
            const videoLink = userPage + '/video/'
            const startLinksSplit = html.split(videoLink)

            const links = []
            for (const splitIndex in startLinksSplit) {

                if (splitIndex === 0) {
                    continue
                }

                const videoId = startLinksSplit[splitIndex].split('"')[0]

                if (isNaN(parseInt(videoId))) {
                    continue
                }

                links.push(videoLink + videoId)
            }

            await browser.close()
            resolve(links)
        } catch (e) {
            await browser.close()
            reject(e)
        }
    })
}
