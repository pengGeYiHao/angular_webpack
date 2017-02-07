
const myFcatory = angular.module('myFcatory',[])
myFcatory.factory('util', ['$window', function ($window) {
    /**
     * javascript实用工具类
     * Created by kang on 2015/7/5.
     */
    var util = this;

    /**
     * [cloneObj 克隆一下对象]
     * @param  {[type]} obj [传入对象]
     * @return {[type]}     [输出对象]
     */
    util.cloneObj = function(obj){  
        var o;  
        switch(typeof obj){  
        case 'undefined': break;  
        case 'string'   : o = obj + '';break;  
        case 'number'   : o = obj - 0;break;  
        case 'boolean'  : o = obj;break;  
        case 'object'   :  
            if(obj === null){  
                o = null;  
            }else{  
                if(obj instanceof Array){  
                    o = [];  
                    for(var i = 0, len = obj.length; i < len; i++){  
                        o.push(util.cloneObj(obj[i]));  
                    }  
                }else{  
                    o = {};  
                    for(var k in obj){  
                        o[k] = util.cloneObj(obj[k]);  
                    }  
                }  
            }  
            break;  
        default:          
            o = obj;break;  
        }  
        return o;     
    }

    /**
     * [MillisecondToDate 秒转换成 时分秒格式]
     * @param {[type]} msd [description]
     */
    util.MillisecondToDate = function (msd) {
        var time = parseFloat(msd);
        if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                    parseInt(time / 60.0)) * 60) + "秒";
            }
            else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分钟" +
                    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                    parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
            }
            else {
                time = parseInt(time) + "秒";
            }
        }
        return time;
    }

    /**
     * 检测object的length
     * @param obj 要检测的object
     * @returns {number} object的length
     */
    util.getObjectLength = function (obj) {
        var key, length = 0;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                length++;
            }
        }
        return length; 
    };

    /**
     * 获取url参数
     * @param  {[type]} name [参数name]
     * @return {[type]}      [返回参数name对应值]
     */
    util.getParams = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
     * 获取url中的各个部分
     * @param  {[type]} url [url地址]
     * @return {[type]}     [返回url各部分的对象]
     */
    util.parseURL = function(url){
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
            var ret = {},
            seg = a.search.replace(/^\?/,'').split('&'),
            len = seg.length, i = 0, s;
            for (;i<len;i++) {
            if (!seg[i]) { continue; }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
            }
            return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }    

    // 以“一个中文字符 = 两个英文空格”返回总长度 - make chinese Chars as "  " 2 letters and return the length.
    util.getStringLengthInChinese = function(text) { return text.replace(/[^\x00-\xff]/g, "  ").length;}

    /**
     * js 分页
     * @param  {showPageNums 显示页码数量}
     * @param  {pageNum 每页显示数量}
     * @param  {totals 总数量数量}
     * @param  {curPage 当前页码}
     * @return {[type]}
     */
    
    util.groupPage = function(pageConfig, $scope){

        var totals = pageConfig.totals || 0;
        var pageNum = pageConfig.pageNum || 10;
        var curPage = pageConfig.curPage || 1;
        var showPageNums = pageConfig.showPageNums || 10;

        //总页数
        var totalPages = Math.ceil(totals / pageNum);
        //当前页码改变时，重新编辑pageHtml
        var pageHtml = '';
        //当前页码前面显示数量
        var curPageBeforeNums = (showPageNums/2).toString().indexOf('.') > 0 ? Math.floor(showPageNums/2) : showPageNums/2;
        //当前页码后面显示数量
        var curPageAfterNums = (showPageNums/2).toString().indexOf('.') > 0 ? Math.floor(showPageNums/2) : (showPageNums/2-1);

        //循环遍历页码 并且 特殊显示当前页码
        var groupPageHtml = function(){
            if (i == curPage)  {
               pageHtml += '<li><a class="active">'+ i +'</a></li>';
            }else{
               pageHtml += '<li><a>'+ i +'</a></li>';
            }
        }
        

        //当前页码等于第一页时
        if (curPage == 1) {
            $('.J_pagePre').hide();
            $('.J_firstPage').hide();
        }else{
            $('.J_pagePre').show();
            $('.J_firstPage').show();
        }
        
        //当前页码等于最后一页时
        if(curPage == totalPages){
            $('.J_pageNext').hide();
            $('.J_lastPage').hide();
        }else{
            $('.J_pageNext').show();
            $('.J_lastPage').show();
        }

        //总页数 < 设置的显示页码数量时
        if(totalPages < showPageNums){
            for (var i = 1; i <= totalPages; i++) {
                groupPageHtml();
            }
        //当前页码 < 当前页码前面显示数量时
        }else if(curPage <= curPageBeforeNums){

            for (var i = 1; i <= showPageNums; i++) {
                groupPageHtml();
            }
        //当前页码 > 当前页码后面显示数量 && 总页数 > （当前页码＋当前页码后面显示数量）
        }else if(curPage > curPageBeforeNums && (parseInt(curPage)+curPageAfterNums) < totalPages){
            
            for (var i = (curPage-curPageBeforeNums); i <= (parseInt(curPage)+curPageAfterNums); i++) {
                
                groupPageHtml();

            }
        //当当前页码 > 当前页码前面显示数量时 && 总页数 < （当前页码＋当前页码后面显示数量）
        }else if(curPage >= curPageBeforeNums && (parseInt(curPage)+curPageAfterNums) >= totalPages){

            for (var i = (totalPages-(showPageNums-1)); i <= totalPages; i++) {
                
                groupPageHtml();

            }

        }

        $('.J_main_page').html(pageHtml);

        $('.J_main_page li').each(function(index){
            $('.J_main_page li').eq(index).click(function(){
                $scope.page.curPage = parseInt($(this).text());
                $scope.getData();
            })
        })
       
        $('.J_pagePre').unbind('click').click(function(){
            $scope.page.curPage = parseInt($scope.page.curPage)-1;
            $scope.getData();
        });
        $('.J_firstPage').unbind('click').click(function(){
            $scope.page.curPage = 1;
            $scope.getData();
        });
    
        $('.J_pageNext').unbind('click').click(function(){
            $scope.page.curPage = parseInt($scope.page.curPage)+1;
            $scope.getData();
        });
        $('.J_lastPage').unbind('click').click(function(){
            $scope.page.curPage = totalPages;
            $scope.getData();
        });
        $(document.body).animate({scrollTop : 0},300);
        $('.page').animate({scrollTop : 0},300);
    }

    /**
     * [unique 数组去重]
     * @return {[type]} [返回去重后的数组]
     */
    Array.prototype.unique = function() { 
        var n = [];
        var m = [];
        //一个新的临时数组 
        for(var i = 0; i < this.length; i++) 
        //遍历当前数组 
        { 
        //如果当前数组的第i已经保存进了临时数组，那么跳过， //否则把当前项push到临时数组里面 
            if (m.indexOf(this[i].id) == -1){
                n.push(this[i]);
                m.push(this[i].id);
            } 
        }
        util.artDialogHint('您的选择有重复项，已为您筛选');
        return n; 
    }

    /**
     * [图片放大组件]
     * @param  {Image}  
     * @return {[type]}     [description]
     */
    util.imgZoom = function(){
        $('.J_img_zoom').click(function(){

            var preloader = new Image();
            preloader.src = $(this).attr('data-imgsrc');
            //loading
            var loading = util.artDialogLoading();
            //img load
            preloader.onload = function() {
                //获取图片的宽度
                var w = preloader.width;
                var h = preloader.height;
                loading.close();
                // debugger;
                if (w > 600) {
                    $('.J_modal_imgzoom img').attr('width', '100%');
                }else{
                    $('.J_modal_imgzoom img').attr('width', 'auto');
                }
                $('.J_modal_imgzoom img').attr('src', preloader.src);
                $('.J_modal_imgzoom').modal('show');
            };
        })
    }
    util.imgZoom();

    /**
     * [showBigImg 显示大图]
     * @param  {[type]} src [图片地址]
     * @return {[type]}     [description]
     */
    util.showBigImg = function(src){
        var srcs = src.split(';');
        console.log(srcs);

        if (!!srcs && srcs.length == 1) {
            var imgHTML = '<img style="max-width: 100%;padding: 100px;margin: 0 auto" src="'+ srcs[0]  +'"/>';
        }else{
            var imgHTML = '<img style="max-width: 100%;padding: 100px;margin: 0 auto" src="'+ srcs[0]  +'"/>' +
            '<img style="max-width: 100%;padding: 100px;margin: 0 auto" src="'+ srcs[1]  +'"/>';
        }

        var html = '<div class="modal fade" id="J_big_img">' +
            '<div class="modal-dialog" style="text-align: center;width: auto">' +
            '<div class="modal-content" style="display: inline-block;">' +
            imgHTML +
            '</div>' +
            '</div>' +
            '</div>';
        $('#wrapper').append(html);
        $('#J_big_img').modal('show');

        $('#J_big_img').on('hidden.bs.modal', function (e) {
            $('#J_big_img').modal('hide');
            $('#J_big_img').remove();
        })
        $('.modal-dialog').on('click', function (e) {
            $('#J_big_img').modal('hide');
            $('#J_big_img').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
        })
    };

    util.logout = function(){
        $('.J_logout').click(function(){
            $.ajax({
                type: 'get',
                url: '/admin/logout.do?token=' + localStorage.getItem('adoreToken') || '',
                success: function(result){
                    if(result.code == 200){
                        location.href = "/login.html";
                        localStorage.removeItem('userData');
                    }else{
                        alert(result.info);
                    }
                }
            })
        })
    };
    util.logout();

    return util;

}]);

module.exports = myFcatory.name;