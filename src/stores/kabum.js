module.exports = async ({
  browser, 
  logger,
  productURL,
  productName,
  messages
}) => {
  const log = logger.createContextLogger({ store: 'Kabum', product: productName });
  
  log.debug('Creating new page...');
  const page = await browser.newPage();

  try {
    log.debug(`Going to ${productURL}`);
    await page.goto(productURL);

    const stockStatus = await page.evaluate(() => {
      return document.querySelectorAll('div.box_botao > div.botao-comprar').length > 0;
    })

    log.info(stockStatus ? messages.IN_STOCK_MESSAGE : messages.OUT_OF_STOCK_MESSAGE);
    return stockStatus;
  } catch (err) {
    log.error(`Request Failed - `, err)
  } finally {
    log.debug('Closing the page...');
    await page.close();
  }
}