(function(){
    angular.module('nashhelps.admin')
        .controller('adminController', adminController);
    
    adminController.$inject = ['$scope', 'servicesService'];

    function adminController($scope, servicesService){
        $scope.services = [];
        $scope.categories = [];
        
        function init(){
            $scope.getServices();
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

        $scope.deleteConfirm = function(service){
            $scope.confirmService = service;
        }
        $scope.delete = function(service){
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