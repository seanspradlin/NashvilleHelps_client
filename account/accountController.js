(function(){
    angular.module('nashhelps')
        .controller('accountController', accountController);
    
    accountController.$inject = ['$scope', 'accountService', 'agencyService', 'servicesService'];

    function accountController($scope, accountService, agencyService, servicesService){

        $scope.profile = {};
        $scope.agency = {};
        $scope.services = [];

        function init (){
            getAccount();
            getServices();
        }

        function getServices(){
            servicesService.getServices()
                .then(function(res){
                    $scope.services = res.data;
                })
        }

        function getAgencyServices(id){
            agencyService.getServicesForAgency(id)
                .then(function(res){
                    $scope.agencyServices = res.data;
                })
        }

        $scope.addServiceToAgency = function(serviceId){
            console.log(serviceId);
            agencyService.addServiceToAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    getAccount();
                });
        }

        $scope.removeServiceFromAgency = function(serviceId){
            console.log(serviceId);
            agencyService.removeServiceFromAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    getAccount();
                });
        }


        function getAccount(){
            accountService.getAccount()
                .then(
                    function(res){
                        $scope.profile.first_name = res.data.name.first;
                        $scope.profile.last_name = res.data.name.last;
                        $scope.profile.email = res.data.email;
                        $scope.profile.phone = res.data.phone;
                        $scope.agency.name = res.data.agency.name;
                        $scope.agency.street1 = res.data.agency.address.street1;
                        $scope.agency.street2 = res.data.agency.address.street2;
                        $scope.agency.city = res.data.agency.address.city;
                        $scope.agency.state = res.data.agency.address.state;
                        $scope.agency.postal = res.data.agency.address.postal;
                        $scope.agency.phone = res.data.agency.phone;
                        $scope.agency.agency_id = res.data.agency._id;                        
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

        $scope.showAddAgencyInputs = function(){
            $scope.addAgencyInputs = true;
        }

        $scope.saveProfile = function(account){
            accountService.updateAccount(account)
                .then(
                    function(res){
                        $scope.success = true;     
                        getAccount();                   
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem saving your changes. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                );
        }

        $scope.saveAgency = function(agency){
            agencyService.updateAgency(agency)
                .then(
                    function(res){
                        $scope.success = true;
                        getAccount();
                    },
                    function (err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem saving your changes. Please contact NashvilleHelps@gmail.com and try again later."
                    }
                )
        }

        init();
    }

})();