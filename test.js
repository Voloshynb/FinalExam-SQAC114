const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test_case() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    let driver;
    try {
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        await driver.get("http://54.196.255.164/"); //change to your url of test env

        await driver.wait(until.elementLocated(By.id("table_game")), 10000);

        let cells = await driver.findElements(By.id("cell0"));

        // Check if cells is iterable (array-like or iterable object)
        if (!Array.isArray(cells) && !cells[Symbol.iterator]) {
            throw new Error('Cells returned by findElements is not iterable.');
        }

        async function checkCell(cell) {
            let text = await cell.getText();
            return text.includes("player text");
        }

        let containsPlayerText = false;
        for (let cell of cells) {
            if (await checkCell(cell)) {
                containsPlayerText = true;
                break;
            }
        }

        if (!containsPlayerText) {
            console.log('Test Success: "player text" is not showing up in any cell.');
        } else {
            console.log('Test Failed: "player text" is present in a cell.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (driver) {
            try {
                await driver.quit();
            } catch (quitError) {
                console.error('Error quitting WebDriver:', quitError);
            }
        }
    }
}

test_case();