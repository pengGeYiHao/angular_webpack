

export default function ($stateProvider,$urlRouterProvider,$locationProvider,dataServiceProvider){
                dataServiceProvider.setUrl('太水了')
                $locationProvider.hashPrefix('')
                $stateProvider
                    .state('/home',{
                        dbstract:true,
                        url:'/home',
                        templateUrl:'../templates/home.html',
                        controller:'homeController'
                    })
                $stateProvider
                    .state('page1',{
                        dbstract:true,
                        url:'/page1',
                        templateUrl:'../templates/page1.html',
                        controller:'page1Controller'

                    })
                $stateProvider
                    .state('page2',{
                        dbstract:true,
                        url:'/page2',
                        templateUrl:'../templates/page2.html',
                        controller:'page2Controller'
                    })
            }