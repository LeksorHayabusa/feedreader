$(function() {

/*'RSS feeds' test checks is the feed source array list
    to not be empty or not contain empty source names or source urls
*/
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
        });

        it('Does the object have URL defined and not empty?', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            })
        })

        it('Does the object have Name defined and not empty?', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            })
        })
    })
/*'MENU Hide-ability' test checks menu is hidden by default or 
    visible by click checking has the body element class 'menu-hidden' 
    or not. Also the test simulates clicking on the menu button
    and checks after sliding out is happened and finished
*/
    describe('Menu hide-ability', () => {
        it('Is menu hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    })

    describe('Menu visibility', () => {
        beforeEach( (done) => {
            const menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click.toggleMenu');
            $('.slide-menu').on('transitionend', () => {
                $(this).off('transitionend');
                done()
            })
        })
        it('Is menu shown by click?', () => {
            const menu = $('.slide-menu');
            let menuPositionLeft = menu.offset().left;
            expect($('body').hasClass('menu-hidden')).toBe(false);
        })
    })
/*'INITIAL Entries' checks is there any element with class 'entry'
    by looking in DOM elements
*/
    describe('Initial Entries', () => {
        beforeEach( (done) => {
            loadFeed(0, done)
        })
        it('Ensure there is/are .entry elements in .feed', () => {
            let isEntryExist = $('.feed .entry').length;
            expect(isEntryExist).toBeGreaterThan(0)
        })
    })
    
/* 'NEW FEED SELECTION' checks whether new feed is loaded be different
*/
    describe('New Feed Selection', () => {
        let oldFeed,
            newFeed;
        const feed = $('.feed');
        beforeEach( done => {
            loadFeed(0,() => {
                oldFeed = feed.html();
                loadFeed(1, () => {
                    newFeed = feed.html();
                    done()
                })
            });
        })
        it('Ensure a new feed is loaded', () => {
            expect(newFeed).not.toEqual(oldFeed)
        })
    })
}());