(function(){
    angular.module('nashhelps')
        .controller('loginController', loginController);
    
    loginController.$inject = ['$scope', '$location', 'accountService', '$timeout'];

    function loginController($scope, $location, accountService, $timeout){
 
        accountService.getAccount().then(function(res){
            $location.path('/account');
        });

        $scope.submit = function(form){
            accountService.login(form)
                .then(
                    function(res){
                        console.log(res);
                        $location.path("/account");
                    }, err
                )
        }
        
        function err(err){
            $scope.message = {
                body: "There was a problem authenticating your access. " + err.Message + " Please contact NashvilleHelps@gmail.com and try again later.",
                title: "An error has occurred",
                error: true
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }
    }
})();