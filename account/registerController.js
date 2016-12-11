(function(){
    angular.module('nashhelps')
        .controller('registerController', registerController);
    
    registerController.$inject = ['$scope', '$location', 'accountService', '$timeout'];

    function registerController($scope, $location, accountService, $timeout){
        $scope.account = {};

        $scope.submit = function(account){
            accountService.register(account)
                .then(
                    function(res) {
                        $location.path("/account/login");
                    }, err
                );
        }

        function err(err){
            $scope.message = {
                body: "There was a problem registering your account. " + err.Message + " Please contact NashvilleHelps@gmail.com and try again later.",
                title: "An error has occurred",
                error: true
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }
    }
})();