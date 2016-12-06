(function(){
    angular.module('nashhelps')
        .controller('dashboardController', dashboardController);
    
    dashboardController.$inject = ['$scope', 'clientService'];

    function dashboardController($scope, clientService){
        $scope.clients = [];
        $scope.completeReferral = {};

        function init(){
            $scope.getClients();
        }
        
        $scope.getClients = function(){
            clientService.getClients()
                .then(
                    function(res){
                        console.log(res);
                        $scope.clients = res;
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving the clients. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
                );
        }

        $scope.confirmComplete = function(clientId, referralId){
            $scope.completeReferral.client_id = clientId;
            $scope.completeReferral.service_id = referralId;
            $scope.completeReferral.notes = '';
        }

        $scope.markComplete = function(referral){
            clientService.completeReferral(referral)
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