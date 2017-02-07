const myProvider=angular.module('myProvider',[]);

myProvider.provider('dataService',function (){       //dataService为服务名
    let url=''
    return {
        setUrl: function (newUrl){
            url=newUrl;
            
        },
        $get: function(){
            return {
                fn: function (){
                    console.log('程序从'+url+'获取了数据');
                    return url;
                }
            }
        }
    }
})

module.exports=myProvider.name
