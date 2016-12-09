(function(){
    angular.module('nashhelps')
        .controller('navController', navController);
    
    navController.$inject = ['$scope', 'accountService'];

    function navController($scope, accountService){
        $scope.isAuthenticated = accountService.is_authenticated;
        $scope.isAdmin = accountService.is_authorized;

        $scope.logout = function(){
            accountService.logout()
                .then(function(){
                    $scope.isAuthenticated = accountService.is_authenticated;
                    $scope.isAdmin = accountService.is_authorized;
                });
        }

    }

})();