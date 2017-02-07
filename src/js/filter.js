const myFilter = angular.module('myFilter', []);
myFilter.filter('testFilter',function (){
	return function (args) {
		return args + "filter 测试"
	}
})
module.exports = myFilter.name;