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
                    $scope.services = res;
                })
        }

        function getAgency(id){
            agencyService.getAgency(id)
                .then(
                    function(res){
                        $scope.agency.name = res.name;
                        $scope.agency.street1 = res.address.street1;
                        $scope.agency.street2 = res.address.street2;
                        $scope.agency.city = res.address.city;
                        $scope.agency.state = res.address.state;
                        $scope.agency.postal = res.address.postal;
                        $scope.agency.phone = res.phone;
                        $scope.agency.agency_id = res._id;
                        populateServices(res.services);
                });
        }

        function populateServices(agencyServices){
            $scope.agency.services = [];
            agencyServices.forEach(function(serviceId){
                servicesService.getService(serviceId)
                    .then(function(res){
                        $scope.agency.services.push(res);
                    })
            })
        }

        $scope.addServiceToAgency = function(serviceId){
            agencyService.addServiceToAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    getAccount();
                    $scope.addAgencyInputs = false;                    
                });
        }

        $scope.removeServiceFromAgency = function(serviceId){
            agencyService.removeServiceFromAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    getAccount();
                });
        }


        function getAccount(){
            accountService.getAccount()
                .then(
                    function(res){
                        $scope.profile.first_name = res.name.first;
                        $scope.profile.last_name = res.name.last;
                        $scope.profile.email = res.email;
                        $scope.profile.phone = res.phone;
                        getAgency(res.agency._id);                       
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