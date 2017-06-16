import { UnwaitPage } from './app.po';

describe('unwait App', () => {
  let page: UnwaitPage;

  beforeEach(() => {
    page = new UnwaitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
