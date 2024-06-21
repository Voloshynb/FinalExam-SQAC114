const { By, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { until } = require("selenium-webdriver");

async function test_case() {
    let options = new chrome.Options();
    options.addArguments('headless'); 
    options.addArguments('disable-gpu'); 
    options.addArguments('no-sandbox'); 
    options.addArguments('disable-dev-shm-usage'); 


    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        await driver.get("/index.html"); 

        await driver.wait(until.elementLocated(By.id("gameBoard")), 10000);

        let cells = await driver.findElements(By.css(".cell")); 

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
        await driver.quit();
    }
}

test_case();