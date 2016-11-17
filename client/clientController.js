(function(){
    angular.module('nashhelps.client')
        .controller('clientController', clientController);

        clientController.$inject = ['$scope', 'clientService', 'servicesService'];

        function clientController($scope, clientService, servicesService){
            
            $scope.client = {
                services: []
            };
            $scope.services = [];
            $scope.categories = [];

            function init(){
                $scope.getServices();
            }

            $scope.getCategories = function(){
                servicesService.getCategories()
                    .then(
                        function(res){
                            $scope.categories = res;
                        },
                        function(err){
                            $scope.error = true;
                            $scope.errorMessage = "There was a problem retrieving the categories. Please contact NashvilleHelps@gmail.com and try again later.";
                        }
                    );
            }

            $scope.isActive = function(service){
                return $scope.client.services.indexOf(service._id) !== -1;
            }

            $scope.toggleService = function(service){
                if ($scope.isActive(service)){
                    $scope.client.services.splice($scope.client.services.indexOf(service._id), 1)
                } else {
                    $scope.client.services.push(service._id);
                }
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

            $scope.submit = function(){
                clientService.addClient($scope.client).then(
                    function(res){
                        $scope.success = true;
                    },
                    function(err){
                        $scope.error = true;
                        $scope.errorMessage = "An error occurred submitting your request. Please contact NashvilleHelps@gmail.com and try again later."                        
                    });
            }

            init();
        }
})();