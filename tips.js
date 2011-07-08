/**
 * 用户头像tips插件
 * @description 用于用户头像上面显示内容, 里面数据使用使用ajax加载数据
 * @namespace faceTips
 * @author Mark.Chen sim_cn@qq.com
 * @version 0.1
 **/
(function ($) {
    //定时器
    var tipsTime = null;
    $.fn.extend({
        /**
         * 头部插件
         **/
        faceTips: function (opt) {
            /**
             * 初始化表单tips容器
             **/
            var _init = function (opt) {
                var len = $('#' + opt.cid).length;
                if (len == 0) {
                    $('body').append($('<div id="' + opt.cid + '"><img src="ajax.gif" alt="正在加载数据..." /></div>').css({
                        'width': opt.w,
                        'height': opt.h,
                        'display': 'none',
                        'position': 'absolute'
                    }));
                    //绑定tips事件
                    $('#' + opt.cid).mouseover(function () {
                        if (tipsTime) {
                            clearTimeout(tipsTime);
                        }
                    }).mouseout(function () {
                        tipsTime = setTimeout(function () {
                            $('#' + opt.cid).hide();
                        }, 500);
                    });
                }
                //加载数据
                $.get(opt.dataurl, {
                    id: opt.aid
                }, function (d) {
                    $('#' + opt.cid).html(d);
                })
            };
            return $(this).each(function () {
                var defopt = {
                    "cid": 'facetips',
                    "w": '300px',
                    "h": '100px',
                    'dataurl': 'test.php'
                };
                if (opt != null) {
                    defopt = $.extend(defopt, opt);
                }
                defopt.aid = $(this).attr('id'); //a链接id
                $(this).mouseover(function (opt) {
                    //清除定时器
                    if (tipsTime) {
                        clearTimeout(tipsTime);
                    }
                    //调用参数
                    _init(defopt);
                    //标签
                    var ch = parseInt($('#' + defopt.cid).css('height'));
                    var cw = parseInt($('#' + defopt.cid).css('width'));
                    var x = ($(this).offset().top - ch - 20) + 'px'; //10为尖角距离
                    var y = $(this).offset().left + 'px';
                    $('#' + defopt.cid).show().css({
                        'left': y,
                        'top': x
                    });
                }).mouseout(function (opt) {
                    tipsTime = setTimeout(function () {
                        $('#facetips').hide();
                    }, 500);
                });
            });
        }
    });
})(jQuery);
