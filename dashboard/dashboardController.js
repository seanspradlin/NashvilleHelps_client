(function(){
    angular.module('nashhelps')
        .controller('dashboardController', dashboardController);
    
    dashboardController.$inject = ['$scope', 'clientService', 'agencyService', 'accountService', '$location', '$timeout'];

    function dashboardController($scope, clientService, agencyService, accountService, $location, $timeout){
        $scope.clients = [];
        $scope.completeReferral = {};

        $scope.all = false;
        $scope.searchBox = " ";

        $scope.toggleAll = function(){
            $scope.all = !$scope.all;
        }

        $scope.showAll = function(client){
            if ($scope.all) {
                return true;
            }
            else {
                return !client.is_fulfilled;
            }
        }

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
                    }, err
                );
        }

        //FIND OUT IF COMPLETE

        $scope.confirmComplete = function(clientId, referral){
            $scope.completeReferral.client_id = clientId;
            $scope.completeReferral.service_id = referral.service;
            $scope.completeReferral.notes = referral.notes;
            $scope.completeReferral.is_complete = referral.is_complete;
            if (referral.agency){
                getAgencyName(referral.agency);
            }
        }

        $scope.editClientConfirm = function(client){
            $scope.editClient = {};
            $scope.editClient.client_id = client._id;
            $scope.editClient.first_name = client.name.first;
            $scope.editClient.last_name = client.name.last;
            $scope.editClient.street1 = client.address.street1;
            $scope.editClient.street2 = client.address.street2;
            $scope.editClient.city = client.address.city;
            $scope.editClient.state = client.address.state;
            $scope.editClient.postal = client.address.postal;
            $scope.editClient.phone = client.phone;
            $scope.editClient.email = client.email;
            $scope.editClient.assistant = client.assistant;
            $scope.editClient.client_notes = client.client_notes;
        }

        $scope.editClientSave = function(client){
            clientService.editClient(client).then(getClients, err);
        }

        $scope.deleteClientConfirm = function(client){
            $scope.deleteClient = client;
        }

        $scope.deleteClientSave = function(clientId){
            clientService.deleteClient(clientId).then(getClients, err);
        }

        function getAgencyName(agencyId){
            return agencyService.getAgency(agencyId)
                .then(function(res){
                    $scope.completeReferralAgency = res.name;
                })
        }

        $scope.markComplete = function(){
            clientService.completeReferral($scope.completeReferral)
                .then(  
                    function(res){
                        success();
                        init();
                    },err
                );
        }

        
        function success(){
            $scope.message = {
                body: "Your changes have been saved.",
                title: "Success",
                error: false
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }
        
        function err(err){
            $scope.message = {
                body: "There was a problem saving your changes. " + err.Message + "Please contact NashvilleHelps@gmail.com and try again later.",
                title: "An error has occurred",
                error: true
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }

        init();
    }
})();