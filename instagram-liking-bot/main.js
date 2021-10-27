const puppeteer = require('puppeteer');
 
(async () => {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', {waitUntil: 'networkidle2'});
    await page.waitFor(1000);
    const instagramUsernameInput = await page.$('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(2) > div > label > input');
    await instagramUsernameInput.type('r.programminghumor');
    const instagramPasswordInput = await page.$('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(3) > div > label > input');
    await instagramPasswordInput.type('Cubepro2002');
    const instagramSignInButton = await page.$('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button')
    await page.waitFor(1000);
    instagramSignInButton.click();
    await page.waitFor(5000);
    randomHashtag();
    await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`, {waitUntil: 'networkidle2'});
    await page.waitFor(3000);
    const firstHashtagPost = await page.$('._9AhH0');
    firstHashtagPost.click();
    await page.waitFor(4000);
    
    let counter = 0;
    let likeCounter = 0;
    let commentCounter = 0;
    let followCounter = 0;
    while (true) {
        const likeButton = await page.$('body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button')
        const nextPostButton = await page.$('.coreSpriteRightPaginationArrow');
        const commentSelector = await page.$('body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea');
        const commentButton = await page.$('body > div._2dDPU.vCf6V > div.zZYga > div > article > div.eo2As > section.sH9wk._JgwE > div > form > button')
        const followSelector = await page.$('body > div._2dDPU.vCf6V > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.bY2yH > button')
        likeButton.click();
        likeCounter++;
        console.log(likeCounter);
        await page.waitFor(6000);
        nextPostButton.click();
        console.log(counter % 5);
        if ((counter % 5) === 0) {
            console.log('comment');
            await page.waitFor(1500);
            await commentSelector.type('Hi');
            await page.waitFor(60);
            commentButton.click();
        }
        if ((counter % 15) === 0) {
            console.log('follow')
            await page.waitFor(1500);
            await followSelector.click();
        }
        await page.waitFor(6000);
        counter++;
    }
})();

let hashtag = '';
let currentHashtagIndex = 0;
function randomHashtag() {
    const hashtagList = ['memes', 'dankmemes', 'bestmemes', 'legendarymemes', 'edgymemes']
    let newHashtagIndex = (Math.floor(Math.random() * hashtagList.length))
    if (newHashtagIndex === currentHashtagIndex) {
        newHashtagIndex++;
    }
    currentHashtagIndex = newHashtagIndex;
    hashtag = hashtagList[currentHashtagIndex]
}