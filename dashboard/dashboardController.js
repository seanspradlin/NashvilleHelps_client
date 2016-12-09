(function(){
    angular.module('nashhelps')
        .controller('dashboardController', dashboardController);
    
    dashboardController.$inject = ['$scope', 'clientService', 'accountService', '$location'];

    function dashboardController($scope, clientService, accountService, $location){
        $scope.clients = [];
        $scope.completeReferral = {};

        function init(){
            getAccount();
            $scope.getClients();
        }

        function getAccount(){
            accountService.getAccount().then(
                function(currentUser){
                    $scope.is_admin = currentUser.is_admin;
                }, function redirect(err){
                    $location.path('/account/login');
                });
        }
        
        $scope.getClients = function(){
            clientService.getClients()
                .then(
                    function(res){
                        $scope.clients = res;
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving the clients. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
                );
        }

        //FIND OUT IF COMPLETE

        $scope.confirmComplete = function(clientId, referral){
            $scope.completeReferral.client_id = clientId;
            $scope.completeReferral.service_id = referral.service;
            $scope.completeReferral.notes = referral.notes;
            $scope.completeReferral.is_complete = referral.is_complete;
        }

        $scope.markComplete = function(){
            clientService.completeReferral($scope.completeReferral)
                .then(  
                    function(res){
                        $scope.success = true;
                        init();
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem saving your changes. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
                );
        }

        init();
    }
})();