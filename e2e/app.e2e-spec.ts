import { ActivistFrontendPage } from './app.po';

describe('activist-frontend App', () => {
  let page: ActivistFrontendPage;

  beforeEach(() => {
    page = new ActivistFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
