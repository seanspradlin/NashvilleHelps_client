(function(){
    angular.module('nashhelps.admin')
        .controller('adminController', adminController);
    
    adminController.$inject = ['$scope', 'servicesService', 'userService', 'agencyService'];

    function adminController($scope, servicesService, userService, agencyService){
        $scope.services = [];
        $scope.categories = [];
        $scope.users = [];
        
        function init(){
            $scope.getServices();
            $scope.getUsers();
        }

        $scope.getUsers = function(){
            userService.getUsers()
                .then(
                    function(res){
                        $scope.users = res.data;
                        populateAgencies();
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "There was a problem retrieving the users. Please contact NashvilleHelps@gmail.com and try again later.";
                    }
                )
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


        $scope.getServices = function(){
            servicesService.getServices()
                .then(
                    function(res){
                        $scope.services = res.data;
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

        init();
    }

})();