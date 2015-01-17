// main
$(function () {
    // define popup menues
    var newsItems = (function () {
        return [{
                Title: 'Yediot',
                Url: 'http://www.ynet.co.il',
                childItems: [{
                        Title: 'Entertainment',
                        Url: '',
                        childItems: [{
                                Title: 'Blazer',
                                Url: 'http://www.ynet.co.il/home/0,7340,L-3456,00.html',
                                childItems: []
                            },
                            {
                                Title: 'פנאי פלוס',
                                Url: 'http://pplus.ynet.co.il/home/0,7340,L-11211,00.html',
                                childItems: []
                            },
                            {
                                Title: 'לאשה',
                                Url: 'http://xnet.ynet.co.il/laisha/home/0,14961,L-4335,00.html',
                                childItems: []
                            },
                            {
                                Title: 'Tours',
                                Url: 'http://www.ynettours.co.il/',
                                childItems: []
                            }
                        ]
                    },
                    {
                        Title: 'Health',
                        Url: '',
                        childItems: [{
                                Title: 'מנטה',
                                Url: 'http://www.ynet.co.il/home/0,7340,L-1209,00.html',
                                childItems: []
                            }
                        ]
                    },
                    {
                        Title: 'English',
                        Url: 'http://www.ynetnews.com/home/0,7340,L-3083,00.html',
                        childItems: []
                    }

                ]
            },
            {
                Title: 'קבוצת שוקן',
                Url: '',
                childItems: [{
                        Title: 'הארץ',
                        Url: 'http://www.haaretz.co.il/',
                        childItems: []
                    },
                    {
                        Title: 'וואלה',
                        Url: 'http://www.walla.co.il/',
                        childItems: [{
                                Title: 'ספורט',
                                Url: 'http://sports.walla.co.il/',
                                childItems: []
                            },
                            {
                                Title: 'עסקים',
                                Url: 'http://finance.walla.co.il/',
                                childItems: []
                            },
                            {
                                Title: 'Timeout',
                                Url: 'http://timeout.co.il/',
                                childItems: []
                            }
                        ]
                    }
                ]
            }
        ];
    })();
    var productsItems = (function () {
        return [{
                Title: 'מכוניות',
                Url: '',
                childItems: [{
                        Title: 'יונדאי',
                        Url: '',
                        childItems: [{
                                Title: 'יונדאי סנטה פה',
                                Url: 'http://www.hyundaimotors.co.il/models/santafe/',
                                childItems: []
                            },
                            {
                                Title: 'יונדאי i10',
                                Url: 'http://www.hyundaimotors.co.il/models/i10/',
                                childItems: []
                            }
                        ]
                    },
                    {
                        Title: 'למבורגיני',
                        Url: 'http://www.lamborghini.com/en/home/',
                        childItems: []
                    },
                    {
                        Title: 'פולקסוואגן',
                        Url: 'http://www.vw.co.il/',
                        childItems: [{
                                Title: 'פולו',
                                Url: 'http://www.vw.co.il/models/%D7%94%D7%A4%D7%95%D7%9C%D7%95-%D7%94%D7%97%D7%93%D7%A9%D7%94/%D7%91%D7%99%D7%A6%D7%95%D7%A2%D7%99%D7%9D/',
                                childItems: []
                            },
                            {
                                Title: 'גולף',
                                Url: 'http://www.vw.co.il/models/sv/%D7%9E%D7%90%D7%A4%D7%99%D7%99%D7%A0%D7%99%D7%9D-%D7%95%D7%91%D7%99%D7%A6%D7%95%D7%A2%D7%99%D7%9D/',
                                childItems: []
                            },
                        ]
                    }
                ]
            },
            {
                Title: 'מוצרי חשמל',
                Url: '',
                childItems: [{
                        Title: 'אבי סופר',
                        Url: 'http://www.soferavi.co.il/',
                        childItems: []
                    },
                    {
                        Title: 'טרקלין חשמל',
                        Url: 'http://www.traklin.co.il/',
                        childItems: []
                    }
                ]
            }
        ];
    })();

    var newsPopupMenu = new popupMenu(newsItems, 'news_popup_menu', 'newsMenuItem', 150, true);
    var productsPopupMenu = new popupMenu(productsItems, 'products_popup_menu', 'productsMenuItem', 100);
})
// popupMenu class
var popupMenu = function (popupItems, popupMenuIdInitial, topMenuItemId, itemWidth, openInSameWindow) {
    this.popupItems = popupItems;
    this.popupMenuIdInitial = popupMenuIdInitial;
    this.topMenuItemId = topMenuItemId;
    this.itemWidth = itemWidth;
    this.openInSameWindow = (openInSameWindow != null ? openInSameWindow : false);

    this.menuitem_hover();
    this.topmenuitem_hover();
    this.invoke_popup_hover();
    this.menulink_click();
    this.document_click();
};
popupMenu.prototype = (function () {
    return {
        hidePopupMenu: function (itemHierarchy) {
            var self = this;
            var items = self.findItems(self.popupItems, itemHierarchy);
            $(items).each(function (indx, item) {
                self.hidePopupMenu(itemHierarchy + '_' + indx);
            });

            $('#' + self.popupMenuIdInitial + itemHierarchy).hide();
        },
        findItems: function (items, relativeHierarchy) {
            var self = this;
            if (relativeHierarchy.indexOf('_') != -1) {
                var indx = Number(relativeHierarchy.match(/^\d+(?=\_)/)[0]);
                return self.findItems(items[indx].childItems, relativeHierarchy.replace(/^\d+\_/, ''));
            }
            else
                return items[Number(relativeHierarchy)].childItems;
        },
        getMenuItemWidth: function () {
            return (this.itemWidth != null ? this.itemWidth : $('#' + this.topMenuItemId).width());
        },
        menuitem_hover: function () {
            var self = this;
            $('.menuitem').live('hover', function (event) {
                if ($(event.target).closest('#' + self.topMenuItemId).length == 0 && $(event.target).closest('[id^="' + self.popupMenuIdInitial + '"]').length == 0) {
                    $('[id^="' + self.popupMenuIdInitial + '"]').hide();
                    return;
                }

                if ($(event.target).closest('#' + self.topMenuItemId).length > 0)
                    return;

                if ($(event.target).attr('item-hierarchy').indexOf('_') != -1) {
                    var parentHierarchy = $(event.target).attr('item-hierarchy').replace(/\_\d+$/, '');
                    var menuItemIndx = Number($(event.target).attr('item-hierarchy').match(/(?:\_)\d+$/, '')[0].replace('_',''));
                    var items = self.findItems(self.popupItems, parentHierarchy);

                    $(items).each(function (indx, item) {
                        if (indx == menuItemIndx) return true;
                        self.hidePopupMenu(parentHierarchy + '_' + indx);
                    });
                }
                else {
                    var menuItemIndx = Number($(event.target).attr('item-hierarchy'));
                    $(self.popupItems).each(function (indx, item) {
                        if (indx == menuItemIndx) return true;
                        self.hidePopupMenu(String(indx));
                    });
                }
            });
        },
        topmenuitem_hover: function () {
            var self = this;
            var $topMenuItem = $('#' + self.topMenuItemId);
            $topMenuItem.hover(function () {
                var $el = $('#' + self.popupMenuIdInitial);
                if ($el.length == 0) {
                    $el = $(handlebarsCompile($('#popup-menu-template'), { items: self.popupItems, parentInitial: '', popupMenuIdInitial: self.popupMenuIdInitial }));
                    $el.appendTo('body')
                    $el.css({ top: $topMenuItem.position().top + $topMenuItem.height(), left: $topMenuItem.position().left, width: self.getMenuItemWidth() + 5 });
                }

                $el.show();
            })
        },
        invoke_popup_hover: function () {
            var self = this;
            var $topMenuItem = $('#' + self.topMenuItemId);
            $('[id^="' + self.popupMenuIdInitial + '"] .menuitem.invoke_popup').live('hover', function () {
                var $menuitem = $(this);
                var itemHierarchy = $menuitem.attr('item-hierarchy');
                var $el = $('#' + self.popupMenuIdInitial + itemHierarchy);
                if ($el.length == 0) {
                    var items = self.findItems(self.popupItems, itemHierarchy);
                    $el = $(handlebarsCompile($('#popup-menu-template'), { items: items, parentInitial: itemHierarchy, popupMenuIdInitial: self.popupMenuIdInitial }));
                    $el.appendTo('body')
                    $el.css({ top: $menuitem.offset().top, left: $menuitem.offset().left - self.getMenuItemWidth(), width: self.getMenuItemWidth() });
                }

                $el.show();
            })
        },
        menulink_click: function () {
            var self = this;
            $('[id^="' + self.popupMenuIdInitial + '"] .menulink').live('click', function () {
                var href = $(this).attr('href-data');
                if (!/^(https?\:\/\/|www\.)/.test(href)) href = (!/^[\/\\]/.test(href) ? '/' : '') + href;
                window.open(href, self.openInSameWindow ? '_self' : '_blank');
            });
        },
        document_click: function () {
            var self = this;
            $(document).click(function (event) {
                if ($(event.target).closest('#' + self.topMenuItemId).length == 0 && $(event.target).closest('[id^="' + self.popupMenuIdInitial + '"]').length == 0)
                    $('[id^="' + self.popupMenuIdInitial + '"]').hide();
            })
        }
    }
})();
// handlebars
var handlebarsCompile = function ($mv_chat_template, context) {
    var source = $mv_chat_template.html();
    var template = Handlebars.compile(source);
    return template(context);
};
function IsURL(url) {
    var strRegex = "^((https|http)?://)"
        + "([0-9a-z_!~*'()-]+\.)*" // www.
        + "([0-9a-z][0-9a-z-]{0,61})?([0-9a-z]\."
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(url);
}


