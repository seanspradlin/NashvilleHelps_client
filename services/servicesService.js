(function(){
    angular.module('nashhelps.services')
        .factory('servicesService', servicesService);
    
    servicesService.$inject = ['$http', 'api'];

    function servicesService($http, api){
        var servicesApi = api.baseUrl + 'services';

        function getServices() {
            return $http.get(servicesApi)
                .then(function(res){
                    return res;
                });
        }

        function getCategories() {
            return $http.get(servicesApi)
                .then(function(res){
                    return res.data.map(function(service, index, categories){
                        if (categories.indexOf(service.category) === -1){
                            return service.category;
                        }
                    });
            });
        }
        
        function addService(service){
            return $http.post(servicesApi, service)
                .then(
                    function(res){
                        return res;
                    }
                )
        }

        function deleteService(serviceId){
            return $http.delete(servicesApi + serviceId)
                .then(
                    function(res){
                        return res;
                    }
                )
        }

        return {
            getServices: getServices,
            getCategories: getCategories,
            addService: addService,
            deleteService: deleteService
        }
    }

})();
