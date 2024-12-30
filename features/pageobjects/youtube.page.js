const { $, browser, expect } = require("@wdio/globals");

class YouTube {
  get searchBar() {
    return $("//input[@role='combobox']");
  }
  get seachButton() {
    return $(".ytSearchboxComponentSearchButton");
  }
  get resultvideos() {
    return $$("#contents");
  }
  get firstVideo() {
    return $("//img[contains(@class,'yt-core-image')][1]");
  }
  get skipButton(){
    return $(".ytp-skip-ad-button")
  }

  get playButton(){
    return $("//div[@class='ytp-left-controls']//button[@data-title-no-tooltip='Play']")
  }

  get RunningVideo(){
    return $("//video[@class='video-stream html5-main-video'][1]")
  }

  get settingsButton(){
    return $("//button[@class='ytp-button ytp-settings-button']")
  }
  async openYoutube() {
    await browser.url("https://www.youtube.com/");
  }

  async checkTitle() {
    const title = await browser.getTitle();
    console.log("page title is :-", title);

    expect(title).toEqual("YouTube");
  }

  async checkURL() {
    const browserURL = await browser.getUrl();
    console.log("browser url :- ", browserURL);
    expect(browserURL).toEqual("https://www.youtube.com/");
  }

  async clickSearchBar() {
    await this.searchBar.click();
  }

  async searchvideo() {
    await this.searchBar.setValue("Selenium tutorial");
    await this.seachButton.click();
  }

  async verifyVideos() {
    const countVideos = await this.resultvideos.length;
    console.log("resultant videos :- ", countVideos);
    expect(countVideos).toBeGreaterThan(1);
  }

  async clickFirstVideo() {
    await this.firstVideo.scrollIntoView();
    await this.firstVideo.click();
    await browser.pause(5000);
  }

  async clickSkipButton(){
    await this.skipButton.waitForDisplayed()
    await this.skipButton.click()
  }

  async checkVideoStatus(){
    await this.RunningVideo.click()
    await this.playButton.waitForExist()
    expect(this.playButton).toBeDisplayed()
  }

  async clickSettingsButton(){
    await this.settingsButton.click()
  }
}

module.exports = new YouTube();
