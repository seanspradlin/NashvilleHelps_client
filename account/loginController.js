(function(){
    angular.module('nashhelps')
        .controller('loginController', loginController);
    
    loginController.$inject = ['$scope', '$location', 'accountService'];

    function loginController($scope, $location, accountService){
 
        $scope.submit = function(form){
            accountService.login(form)
                .then(
                    function(res){
                        console.log(res);
                        $location.path("/account");
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem authenticating your credentials. Please contact NashvilleHelps@gmail.com or try again."
                    }
                )
        }
    }
})();