(function(){
    angular.module('nashhelps')
        .controller('accountController', accountController);
    
    accountController.$inject = ['$scope', 'accountService', 'agencyService', 'servicesService', '$location', '$timeout'];

    function accountController($scope, accountService, agencyService, servicesService, $location, $timeout){

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
                    }, err)
            })
        }

        $scope.addServiceToAgency = function(serviceId){
            agencyService.addServiceToAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    success();
                    getAccount();
                    $scope.addAgencyInputs = false;                    
                }, err);
        }

        $scope.removeServiceFromAgency = function(serviceId){
            agencyService.removeServiceFromAgency(serviceId, $scope.agency.agency_id)
                .then(function(res){
                    success();
                    getAccount();
                }, err);
        }

        function getAccount(){
            accountService.getAccount().then(
                function(currentUser){
                    $scope.profile.first_name = currentUser.name.first;
                    $scope.profile.last_name = currentUser.name.last;
                    $scope.profile.email = currentUser.email;
                    $scope.profile.phone = currentUser.phone;
                    getAgency(currentUser.agency._id);
                }, function redirect(err){
                    $location.path('/account/login');
                });
        }


        $scope.changePassword = function(password){
            accountService.changePassword(password)
                .then(
                    function(res){
                        success();
                        $scope.password = ""
                    }, err
                );
        }

        $scope.showAddAgencyInputs = function(){
            $scope.addAgencyInputs = true;
        }

        $scope.saveProfile = function(account){
            accountService.updateAccount(account)
                .then(
                    function(res){
                        success();  
                        getAccount();                   
                    }, err
                );
        }

        $scope.saveAgency = function(agency){
            agencyService.updateAgency(agency)
                .then(
                    function(res){
                        success();
                        getAccount();
                    }, err)
        }

        init();

        function success(){
            $scope.message = {
                body: "Success! Your changes have been saved.",
                title: "",
                error: false
            }
            $timeout(function(){
                $scope.message = null;
            }, 2000);
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
    }

})();