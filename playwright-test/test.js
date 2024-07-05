const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to https://www.kurtosys.com/
    await page.goto('https://www.kurtosys.com/', { waitUntil: 'networkidle0' });

    // Navigate to “INSIGHTS”
    await page.waitForSelector('text=INSIGHTS');
    await page.click('text=INSIGHTS');

    //
    await page.waitForSelector('#specific-container .elementor-icon-list-text', { timeout: 60000 });
    await page.click('#specific-container .elementor-icon-list-text');

    // Verify Title reads “White Papers”
    const title = await page.title();
    if (title !== 'White Papers') {
        console.error(`Title verification failed. Expected "White Papers", got "${title}"`);
    } else {
        console.log('Title verification passed.');
    }

    // Click on “UCITS Whitepaper”
    await page.click('text=UCITS White Paper');

    // Fill in form fields
    await page.fill('input[name="FirstName"]', 'John');
    await page.fill('input[name="LastName"]', 'Doe');
    await page.fill('input[name="Company"]', 'Example Company');
    await page.fill('input[name="Industry"]', 'Technology');

    // Click “Send me a copy”
    await page.click('text=Send me a copy');

    // Add screenshot of the error messages
    await page.screenshot({ path: 'error-messages-' + Date.now() + '.png' });

   

    await browser.close();
})();