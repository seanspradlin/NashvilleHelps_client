(function(){
    angular.module('nashhelps.account')
        .controller('accountController', accountController);
    
    accountController.$inject = ['$scope', 'accountService'];

    function accountController($scope, accountService){

        function init (){
            $scope.profile = {};
            $scope.getAccount();
        }

        $scope.getAccount = function(){
            accountService.getAccount()
                .then(
                    function(res){
                        $scope.profile.first_name = res.data.name.first;
                        $scope.profile.last_name = res.data.name.last;
                        $scope.profile.email = res.data.email;
                        $scope.profile.phone = res.data.phone;
                        
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving your account. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }


        $scope.changePassword = function(password){
            accountService.changePassword(password)
                .then(
                    function(res){
                        $scope.success = true;
                        $scope.password = ""
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem saving your new password. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }

        $scope.saveProfile = function(account){
            console.log(account);
            accountService.updateAccount(account)
                .then(
                    function(res){
                        $scope.success = true;     
                        $scope.getAccount();                   
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem saving your information. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }

        init();
    }

})();