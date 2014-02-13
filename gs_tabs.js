;(function ($) {    
    /**
     * tabs组件
     * @returns this;
     */
    $.fn.gs_tabs = function (opts) {
        
        opts = $.extend({
            'title': 'li > a'
            ,'active': 'active'
            ,'content':'.gs-tab-content'
            ,'callback':''
        }, opts);
        
        var $this = $(this)
            ,$tab_title = $this.find(opts.title)
            ,idlist = [];
        
        $tab_title.each(function(i){
            idlist.push($(this).attr('href')); //记录id
        });
        /**
         * 不是自己的隐藏掉
         * @param	{string}	c	id标记
         * @returns	null
         */
        var hide_content = function(c){
            for (i in idlist) {
                if (idlist[i]!=c) {
                    $(idlist[i]).hide().removeClass(opts.active);
                }
            }
        }
        
        $tab_title.on('click',function(){
            var showC = $(this).attr('href');
            hide_content();
            $(showC).show().addClass(opts.active);
            
            //自定议结构需要把 active 写在自已无素上
            if (opts.title != 'li > a') {
                $(this).siblings().removeClass(opts.active).end().addClass(opts.active);
            }else{
                $(this).parent().siblings().removeClass(opts.active).end().addClass(opts.active);
            }
            //回调
            opts.callback && opts.callback(this);
            return false;
        });
        return this;
    };
    
})(window.jQuery);

