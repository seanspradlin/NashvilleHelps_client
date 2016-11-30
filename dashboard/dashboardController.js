(function(){
    angular.module('nashhelps.dashboard')
        .controller('dashboardController', dashboardController);
    
    dashboardController.$inject = ['$scope', 'clientService'];

    function dashboardController($scope, clientService){
        $scope.clients = [];
        
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

        $scope.markComplete = function(clientId, serviceId){
            clientService.completeReferral(clientId, serviceId)
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