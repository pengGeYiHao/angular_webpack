
const myService = angular.module('myService', []);
myService.service('mainService',['$http',function($http){
	return {
		
	}
}]);
myService.service('homeService',['$http',function($http){
	return {
		testService:'test123',
		http:$http
	}
}]);
myService.service('page1Service',['$http',function($http){
	return {
		
	}
}]);
myService.service('page2Service',['$http',function($http){
	return {
		
	}
}]);
module.exports = myService.name;