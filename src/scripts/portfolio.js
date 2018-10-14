var Shuffle = require('shufflejs/dist/shuffle');

var portfolio = (function () {

    var element = document.querySelector('.feature-works');
    var sizer = element.querySelector('.sizer');
    var items = '.work';
    var options = document.querySelector('.filter-options');
    var children = options.querySelectorAll('a');

    var run = function () {

        this.shuffle = new Shuffle(element, {
            itemSelector: items,
            sizer: sizer,
            isCentered: true
        });
        this._activeFilters = [];
        this.addFilterButtons();

    };

    run.prototype.addFilterButtons = function () {

        if (!options) {
            return;
        }
        var filterButtons = Array.from(children);

        filterButtons.forEach(function (button) {            
            button.addEventListener('click', this._handleFilterClick.bind(this), false);
        }, this);

    };

    run.prototype._handleFilterClick = function (evt) {

        var btn = evt.currentTarget;
        var btnGroup = btn.getAttribute('data-group');

        this._removeActiveClassFromChildren();

        var filterGroup;
        if (btnGroup === "All") {
            filterGroup = Shuffle.ALL_ITEMS;
        } else {            
            filterGroup = btnGroup;
        }
        btn.classList.add('active');
        this.shuffle.filter(filterGroup);

    };

    run.prototype._removeActiveClassFromChildren = function () {

        for (var i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('active');
        }

    };

    return {
        init: run
    };
})();

module.exports = portfolio;