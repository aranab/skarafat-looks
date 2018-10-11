var lib = (function () {

    var Dom = {
        mbDom: document.getElementById("mb-menu")
    };    

    var mobileNavClose = true;

    var HasClass = function (el, className) {
        return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ');
    };

    var mobileNav = function (close) {
        var dom = Dom.mbDom;
        if (close === true) {            
            this.mobileNavClose = true;
            dom.classList.remove('open');
            return;
        }
        if (HasClass(dom, 'open')) {
            this.mobileNavClose = true;
            dom.classList.remove('open');
        } else {
            this.mobileNavClose = false;
            dom.classList.add('open');
        }
    };

    return {
        mobileMenu: mobileNav,
        mobileNavClose: mobileNavClose
    };
})();

module.exports = lib;