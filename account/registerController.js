(function(){
    angular.module('nashhelps')
        .controller('registerController', registerController);
    
    registerController.$inject = ['$scope', '$location', 'accountService'];

    function registerController($scope, $location, accountService){
        $scope.account = {};

        $scope.submit = function(account){
            accountService.register(account)
                .then(
                    function(res) {
                        $location.path("/account/login");
                    }, function(err) {
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem registering your account. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }
    }
})();