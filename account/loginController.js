(function(){
    angular.module('nashhelps')
        .controller('loginController', loginController);
    
    loginController.$inject = ['$scope', '$window', 'accountService'];

    function loginController($scope, $window, accountService){
 
        $scope.submit = function(form){
            accountService.login(form)
                .then(
                    function(res){
                        console.log(res);
                        $window.location.href = "/account";
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem authenticating your credentials. Please contact NashvilleHelps@gmail.com or try again."
                    }
                )
        }
    }
})();