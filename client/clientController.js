(function(){
    angular.module('nashhelps')
        .controller('clientController', clientController);

        clientController.$inject = ['$scope', 'clientService', 'servicesService', '$timeout'];

        function clientController($scope, clientService, servicesService, $timeout){
            
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
                        }, err
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
                            $scope.services = res;
                            $scope.getCategories();
                        }, err
                    );
            }

            $scope.submit = function(){
                        console.log("eroi2 jk")
                
                clientService.addClient($scope.client).then(
                    function(res){
                        console.log("CSuldhrugdhliug")
                        $scope.success = true;
                        success();
                    }, err);
            }

            init();

            
        function success(){
            $scope.message = {
                body: "Thanks for submitting your information! Someone will contact you from one of our partner organizations soon with details on how they can help. To request more information about Nashville Helps, please contact NashvilleHelps@gmail.com, or Megan Godbey at (615) 880-2264 or Megan.Godbey@nashville.gov",
                title: "Success",
                error: false
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }
        
        function err(err){
            $scope.message = {
                body: "An error occurred processing your request. " + err.Message + "Please contact NashvilleHelps@gmail.com and try again later.",
                title: "An error has occurred",
                error: true
            }
            $timeout(function(){
                $scope.message = null;
            }, 5000);
        }
        }
})();