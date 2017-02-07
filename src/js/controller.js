
const myModule = angular.module('myModule', []);
myModule.controller('mainController',function ($scope,$http,$location,dataService){
	$scope.name=dataService.fn();
})
myModule.controller('homeController',function($scope,$http,$state,$stateParams,homeService) {
	$scope.home='home'
	console.log(homeService)
});
myModule.controller('page1Controller',function ($scope,$http,$location,page1Service){
	$scope.page1='page1'
})
myModule.controller('page2Controller',function ($scope,$http,$location,page2Service){
	$scope.page2='page2'
	console.log($==jQuery)
})
// myModule.config(function (dataServiceProvider){         //记住一定要是自己定义的服务器名加Provider后缀
//     console.log('aaaaaaa')
//     dataServiceProvider.setUrl('太水了')
// });
module.exports = myModule.name;