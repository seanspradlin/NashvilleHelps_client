(function(){
    angular.module('nashhelps')
        .controller('adminController', adminController);
    
    adminController.$inject = ['$scope', 'servicesService', 'userService', 'agencyService', 'accountService', '$location', '$timeout'];

    function adminController($scope, servicesService, userService, agencyService, accountService, $location, $timeout){
        $scope.services = [];
        $scope.categories = [];
        $scope.users = [];
        $scope.agencies = [];

        function init(){
            getServices();
            getUsers();
            getAgencies();
        }

        function getAccount(){
            accountService.getAccount()
                .then(
                    function(res){
                        if (!res.is_admin){
                            $location.path('/account');
                        }
                        init();
                    },
                    function redirect(err){
                        $location.path('/account/login');
                    })
        }

        function getAgencies(){
            agencyService.getAgencies()
                .then(function(res){
                    $scope.agencies = res;
                }, err
                )
        }

        $scope.showAddAgencyInputs = function(){
            $scope.newAgency = {};
            $scope.addAgencyInputs = true;
        }

        $scope.addAgency = function(){
            agencyService.addAgency($scope.newAgency)
                .then(
                    function(res){
                        getAgencies();
                        $scope.showAddAgencyInputs = false;
                        $scope.newAgency = {};
                    }, err
                )
        }

        function getUsers(){
            userService.getUsers()
                .then(
                    function(res){
                        $scope.users = res;
                        populateAgencies();
                    }, err
                )
        }   

        $scope.editUserConfirm = function (user){
            $scope.editUser = user;
        } 

        $scope.editUser = function(user){
            userService.editUser(user)
                .then(getUsers, err);
        }

        $scope.deleteUser = function(user){
            userService.deleteUser(user.id)
                .then(getUsers, err);
        }

        $scope.showAddUserInputs = function(){
            $scope.addUserInputs = true;
            $scope.newUser = {};
        }

        $scope.addUser = function(newUser){
            agencyService.createRegistrationTokenForAgency(newUser)
                .then(function(res){
                    $scope.addUserInputs = false;
                    $scope.showToken = true;
                    $scope.token = res.token;
                });
        }

        function populateAgencies(){
            return $scope.users.map(function(v, i, a){
                return getAgency(v.agency)
                    .then(function(res){
                        v.agencyInfo = res.name;
                        return v;
                    });
                });                                
        }

        function getAgency(id){
            return agencyService.getAgency(id);
        }


        function getServices(){
            servicesService.getServices()
                .then(
                    function(res){
                        $scope.services = res;
                        $scope.getCategories();
                    }, err
                );
        }

        $scope.getCategories = function(){
            $scope.categories = servicesService.getCategories().then(function(res){
                $scope.categories = res;
            })
        }

        $scope.showAddInputs = function(){
            $scope.addInputs = true;
        }

        $scope.addService = function(service){
            servicesService.addService(service)
            .then(
                function(res){
                    init();
                }, err
            )
        }

        $scope.editServiceConfirm = function(service){
            $scope.confirmService = service;
        }
        $scope.deleteServiceConfirm = function(service){
            $scope.confirmService = service;
        }
        $scope.deleteService = function(service){
             servicesService.deleteService(service._id)
                .then(
                function(res){
                    $scope.addInputs = false;
                    init();
                }, err
            )
        }

        $scope.editService = function(service){
            servicesService.editService(service).then(init, err);
        }

        $scope.editAgencyConfirm = function(agency){
            $scope.confirmAgency = agency;
            $scope.confirmAgency.agency_id = agency._id;
            $scope.confirmAgency.street1 = agency.address.street1;
            $scope.confirmAgency.street2 = agency.address.street2;
            $scope.confirmAgency.city = agency.address.city;
            $scope.confirmAgency.state = agency.address.state;
            $scope.confirmAgency.postal = agency.address.postal;
        }

        $scope.deleteAgencyConfirm = function(agency){
            $scope.confirmAgency = agency;
        }

        $scope.deleteAgency = function(agencyId){
            agencyService.deleteAgency(agencyId).then(init, err);
        }

        $scope.editAgency = function(agency){
            agencyService.updateAgency(agency).then(init, err);
        }


        getAccount();

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
    }

})();