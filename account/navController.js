(function(){
    angular.module('nashhelps.account')
        .controller('navController', navController);
    
    navController.$inject = ['$scope', 'accountService'];

    function navController($scope, accountService){
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;

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