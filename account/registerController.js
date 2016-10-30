(function(){
    angular.module('nashhelps.account')
        .controller('registerController', registerController);
    
    registerController.$inject = ['$scope', '$window', 'accountService'];

    function registerController($scope, $window, accountService){
        $scope.account = {};

        $scope.submit = function(account){
            accountService.register(account)
                .then(
                    function(res) {
                        $window.location.href = "/account/login.html"
                    }, function(err) {
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem registering your account. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }
    }
})();