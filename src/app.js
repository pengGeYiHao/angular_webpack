
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import MyService from './js/services'
import MyController from './js/controller'
import MyFilter from './js/filter'
import MyFactory from './js/factory'
import MyProvider from './js/provider'
import Nav from './js/nav'
import bootstrap from 'bootstrap'

import './style/bootstrap.css'

const myApp=angular.module("APP",[
	uiRouter,
	MyService,
	MyController,
	MyFilter,
	MyFactory,
	MyProvider
	]);

	myApp.directive('appHome', function() {
	    return {
	        restrict: 'E',
	        templateUrl: './templates/app.html',
	        replace: true
	    };
	})
	.config(['$stateProvider','$urlRouterProvider','$locationProvider','dataServiceProvider',Nav]);