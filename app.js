(function(){
    angular.module('nashhelps', ['ui.materialize', 'ngRoute']);

    angular.module('nashhelps')
        .constant('api', {'baseUrl': 'api/'});

    angular.module('nashhelps')
        .config(routes);

        routes.$inject = ['$routeProvider', '$locationProvider'];

        function routes ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'client/home.html'
                })
                .when('/account', {
                    templateUrl: '/account/account.html',
                    controller: 'accountController'
                })
                .when('/account/login', {
                    templateUrl: '/account/login.html',
                    controller: 'loginController'
                })
                .when('/account/register', {
                    templateUrl: '/account/register.html',
                    controller: 'registerController'
                })
                .when('/admin', {
                   templateUrl: '/admin/admin.html',
                    controller: 'adminController'
                })
                .when('/admin/report', {
                    templateUrl: '/admin/report.html',
                    controller: 'reportController'
                })
                .when('/client', {
                    templateUrl: '/client/client.html',
                    controller: 'clientController'
                })
                .when('/dashboard', {
                    templateUrl: '/dashboard/dashboard.html',
                    controller: 'dashboardController'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });

        }


})();