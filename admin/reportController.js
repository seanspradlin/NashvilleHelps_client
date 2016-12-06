(function(){
    angular.module('nashhelps')
        .controller('reportController', reportController);
    
    reportController.$inject = ['$scope', 'servicesService', 'agencyService', 'clientService'];

    function reportController($scope, servicesService, agencyService, clientService){
        $scope.error = false;        
        $scope.services = [];
        $scope.referrals = [];
        $scope.agencies = [];

        function init(){
            $scope.populateAgencyTable();
            $scope.populateClientTable();
            $scope.populateServicesTable();
        }

        $scope.getServices = function(){
            servicesService.getServices()
                .then(function(res){
                    console.log(res);
                    $scope.services = res;
                },
                function(err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem retrieving the services. Please contact NashvilleHelps@gmail.com and try again later.";
                })
        }

        $scope.populateServicesTable = function(){
            $scope.getServices();
                
        }
        
        $scope.populateClientTable = function(){
            clientService.getReferrals()
                .then(function(res){
                    console.log(res);
                    $scope.referrals = res;
                }, 
                function(err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem retrieving the clients. Please contact NashvilleHelps@gmail.com and try again later.";
                })
        }

        $scope.populateAgencyTable = function(){
            agencyService.getAgencies()
                .then(function(res){
                    console.log(res);
                    $scope.agencies = res;
                }, 
                function(err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem retrieving the agencies. Please contact NashvilleHelps@gmail.com and try again later.";
                })
        }


        function matchReferralsToAgencies(){

        }
        init();
    }
})();