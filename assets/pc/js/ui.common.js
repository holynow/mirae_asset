/*
 * pc용 스크롤바 너비 계산
 * 더미 엘리먼트 너비-내부 엘리먼트 너비=스크롤바 너비
 */
var scrollbarWidth = 0;
var testScrollbarW = function(){
    $("body").append($('<div id="testScrollbar1" style="position:fixed; left:0; top:-100rem; width:100px; height:100px; overflow:auto"><div id="testScrollbar2" style="height:200px"></div></div>'));
    setTimeout(function(){
        scrollbarWidth = $("#testScrollbar1").width() - $("#testScrollbar2").width();
    },200);
}

var focusableElems ="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
var popupClosedFocusElem;
var popup = {
    open : function(elem,btn){
        var pop = elem;
        popupClosedFocusElem = btn;
        pop.addClass("active").attr("aria-hidden", false).attr("tabindex",0).focus();
        $("body,html").addClass("fixed");
        $("body").css("margin-right", scrollbarWidth * 1);
        var bindTabKey = function(obj,evt) {
            if ( evt.which == 9 ) {
                var o = obj.find('*');
                var focusableItems;
                focusableItems = o.filter(focusableElems).filter(':visible');
                var focusedElem;
                focusedElem = $(':focus');
                var numFocusableElems;
                numFocusableElems = focusableItems.length;
                var focusedElemIndex;
                focusedElemIndex = focusableItems.index(focusedElem);
                if (evt.shiftKey) {
                    if(focusedElemIndex==0){
                        focusableItems.get(numFocusableElems-1).focus();
                        evt.preventDefault();
                    }
                } else {
                    if(focusedElemIndex==numFocusableElems-1){
                        focusableItems.get(0).focus();
                        evt.preventDefault();
                    }
                }
            }
        };
		pop.keydown(function(event){
			bindTabKey($(this),event);
        });
    },
    close : function(elem,btn){
        var pop = elem;
        pop.attr("tabindex","1").attr("aria-hidden", true);
        pop.removeClass("active");
        $("body,html").removeClass("fixed");
        $("body").css("margin-right","");
        if(btn){
            btn.focus();
        }else{
            if(popupClosedFocusElem){
                popupClosedFocusElem.focus();
            }
        }
    }
}

var initGnb = function(){
    var header = $("#header");
    var gnb = $("#gnb");
    var timer;
    gnb.on("mouseenter", "> ul > li", function(event){
        clearTimeout(timer);
        if($(this).find("ul").length){
            $(this).siblings().removeClass("depth2")
            header.addClass("depth2");
            $(this).addClass("depth2")
        }else{
            $(this).siblings().removeClass("depth2");
            header.removeClass("depth2");
            $(this).removeClass("depth2")
        }
    });
    gnb.on("mouseleave", "> ul > li", function(event){
        if($(this).find("ul").length){
            $(this).siblings().removeClass("depth2")
            header.addClass("depth2");
            $(this).addClass("depth2")
        }else{
            $(this).siblings().removeClass("depth2")
            header.removeClass("depth2");
            $(this).removeClass("depth2")
        }
    });

    gnb.on("focus", "> ul > li > a", function(event){
        clearTimeout(timer);
        if($(this).siblings("ul").length){
            $(this).parent().siblings().removeClass("depth2")
            header.addClass("depth2");
            $(this).parent().addClass("depth2")
        }else{
            $(this).parent().siblings().removeClass("depth2");
            header.removeClass("depth2");
            $(this).parent().removeClass("depth2")
        }
    });
    gnb.on("mouseleave", "> ul > li", function(event){
        if($(this).find("ul").length){
            $(this).siblings().removeClass("depth2")
            header.addClass("depth2");
            $(this).addClass("depth2")
        }else{
            $(this).siblings().removeClass("depth2")
            header.removeClass("depth2");
            $(this).removeClass("depth2")
        }
    });

    gnb.on("mouseleave", function(event){
        clearTimeout(timer);
        timer = setTimeout(function(){
            header.removeClass("depth2");
            gnb.on("> ul > li").removeClass("depth2")
        },300);
    });
}



var mainUi = {
    init: function init() {
        if ($('.main-visual-box').length) {
            this.mainTopSlider.init();
        }
        if ($('.hall-visual-box').length) {
            this.hallSlider.init();
        }
        if ($('.conve-visual-box').length) {
            this.conveSlider.init();
        }
        if ($('.popup-basic').length) {
            this.popTab.init();
        }
    },
    // main Swiper
    mainTopSlider: {
        init: function () {
            var _this = this;
            var current = $('.main-visual-box');
            if (current.find('.img-list').length > 1) {
                var swiper = new Swiper(current, {
                    wrapperClass: 'img-inner',
                    slideClass: 'img-list',
                    pagination: {
                        clickable: true,
                        el: current.find('.swiper-pagination')
                    },
                    paginationClickable: true,
                    effect: 'fade',
                    slidesPerView: 1,
                    autoplay: {
                        delay: 7000
                    },
                    speed : 2000,
                    loop: true
                });
            }
        }
    },
    // hall swiper
    hallSlider: {
        init: function () {
            var _this = this;
            var current = $('.hall-visual-box');
            current.each(function () {
                var $this = $(this);
                var swiper = new Swiper($this, {
                    wrapperClass: 'img-inner',
                    slideClass: 'img-list',
                    effect: 'fade',
                    slidesPerView: 'auto',
                    pagination: {
                        clickable: true,
                        el: $this.find('.swiper-pagination'),
                        renderBullet: function (index, className) {
                            var getTxt = $this.find('.hall-info').eq(index).find('em')[0].innerText;
                            return '<span class="' + className + '">' + getTxt + '</span>';
                        }, 
                      }
                });
                swiper.on('slideChange', function () {
                    var indx = this.activeIndex;
                    $this.find('.hall-info').eq(indx).addClass('on').siblings('.hall-info').removeClass('on');
                  });
            });
        }
    },
    // convenience swiper
    conveSlider: {
        init: function () {
            var _this = this;
            var current = $('.conve-visual-box');
            if (current.find('.img-list').length > 1) {
                var swiper = new Swiper(current, {
                    wrapperClass: 'img-inner',
                    slideClass: 'img-list',
                    navigation: {
                        nextEl: current.find('.swiper-button-next'),
                        prevEl: current.find('.swiper-button-prev'),
                      },
                    paginationClickable: true,
                    effect: 'fade',
                    slidesPerView: 1,
                    autoplay: {
                        delay: 4000
                    },
                    loop: true,
                    
                });
            }
        }
    },
    // popup tab btn
    popTab: {
        popWrap: '.popup-basic',
        //popBtn: '#popFloor',
        tabList: '.tab-btn li',
        mapInfo: '.content-popup .info',
        init: function (){
            var _this = this;
           // $(_this.popBtn).on('click', function(){
                _this.evtHandler();        
            //})
        },
        evtHandler: function (){
           var _this = this;
           //if($(_this.popWrap).hasClass('active')){
               $(_this.tabList).on('click', function(){                   
                   var idx = $(this).index();
                    $(this).addClass('on');                   
                    $(this).siblings().removeClass('on');                   
                    $(_this.mapInfo).eq(idx).addClass('on');
                    $(_this.mapInfo).eq(idx).siblings().removeClass('on');
               })
           }
        }
    //}
}
window.addEventListener('load', function () {
    mainUi.init();
})

$(function(){
    testScrollbarW();

    var url = document.location.href;
    $('.btn-share').attr("data-clipboard-text",url);
    $('.board-header .share button').attr("data-clipboard-text",url);
    var clipboard = new ClipboardJS('.btn-share, .board-header .share button');
    clipboard.on('success', function(e) {
        alert("공유 주소가 복사되었습니다. 붙여넣기 하세요.");
    });
    clipboard.on('error', function(e) {
        alert("에러가 발생했습니다. 다시 시도해주세요");
    });
});