(function(){
    angular.module('nashhelps')
        .controller('adminController', adminController);
    
    adminController.$inject = ['$scope', 'servicesService', 'userService', 'agencyService', 'accountService', '$location'];

    function adminController($scope, servicesService, userService, agencyService, accountService, $location){
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
                },
                function (err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem retrieving the agencies. Please contact NashvilleHelps@gmail.com and try again later.";
                })
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
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem adding the new agency. Please contact NashvilleHelps@gmail.com and try again later.";
                    })
        }

        function getUsers(){
            userService.getUsers()
                .then(
                    function(res){
                        $scope.users = res;
                        populateAgencies();
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving the users. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
                )
        }   

        $scope.editUserConfirm = function (user){
            $scope.editUser = user;
        } 

        $scope.editUser = function(user){
            userService.editUser(user)
                .then(getUsers);
        }

        $scope.deleteUser = function(user){
            userService.deleteUser(user.id)
                .then(getUsers);
        }

        $scope.showAddUserInputs = function(){
            $scope.addUserInputs = true;
            $scope.newUser = {};
        }

        $scope.addUser = function(){
            agencyUser.generateToken()
                .then(function(res){
                    $scope.showAddUserInputs = false;
                    $scope.token = res;
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
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving the services. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
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
                    $scope.getServices();
                },
                function(err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem adding the service. Please contact NashvilleHelps@gmail.com and try again later."
                }
            )
        }

        $scope.deleteServiceConfirm = function(service){
            $scope.confirmService = service;
        }
        $scope.deleteService = function(service){
             servicesService.deleteService(service._id)
                .then(
                function(res){
                    $scope.addInputs = false;
                    $scope.getServices();
                },
                function(err){
                    $scope.error = true;
                    $scope.errorMessage = "There was a problem deleting the service. Please contact NashvilleHelps@gmail.com and try again later."
                }
            )
        }

        getAccount();
    }

})();