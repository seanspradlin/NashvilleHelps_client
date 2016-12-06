(function(){
    angular.module('nashhelps')
        .controller('navController', navController);
    
    navController.$inject = ['$scope', 'accountService'];

    function navController($scope, accountService){
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;

        $scope.logout = function(){
            accountService.logout()
                .then(getAccount);
        }

        function init(){
            getAccount();
        }

        function getAccount(){
            accountService.getAccount()
                .then(
                    function(res){
                        $scope.isAuthenticated = true;
                        $scope.isAdmin = res.data.is_admin;
                    }, 
                    function(err){ 
                        $scope.isAuthenticated = false; 
                    });
        }

        init();

    }

})();