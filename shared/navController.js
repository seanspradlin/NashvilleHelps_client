(function(){
    angular.module('nashhelps')
        .controller('navController', navController);
    
    navController.$inject = ['$scope', 'accountService', '$location'];

    function navController($scope, accountService, $location){
        
        function init(){
            getAccount()
        }

        function getAccount(){
            accountService.getAccount()
                .then(function(res){                    
                    $scope.is_authenticated = true;
                    $scope.is_authorized = res.is_admin;
                    $scope.currentUser = res;
                }, function(err){
                    $scope.is_authenticated = false;
                    $scope.is_authorized = false;
                    $scope.currentUser = {};
                })
        }

        $scope.logout = function(){
            accountService.logout()
                .then(function(res){
                    $location.path('/account/login')
                });
        }

        init();

    }

})();