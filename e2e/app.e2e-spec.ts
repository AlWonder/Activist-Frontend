import { FirstAngularTwoAppPage } from './app.po';

describe('first-angular-two-app App', function() {
  let page: FirstAngularTwoAppPage;

  beforeEach(() => {
    page = new FirstAngularTwoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
