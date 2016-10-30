(function(){
    angular.module('nashhelps.client')
        .factory('clientService', clientService);
    
    clientService.$inject = ['$http', 'api'];

    function clientService($http, api){
        var clientApi = api.baseUrl + "clients";
        
        function addClient(client){
            return $http.post(clientApi, client).then(
                function(res){
                    return res;
                }
            )
        }

        function getClients (){
            return $http.get(clientApi).then(
                    function(res){
                    return res.data;
                }
            )
        }

        function completeReferral(clientId, serviceId){
            $http.post(clientApi + clientId + '/service/' + serviceId)
                .then(
                    function(res){
                    return res;
                });
        }
        
        return {
            addClient: addClient,
            getClients: getClients,
            completeReferral: completeReferral
        }
    }
})();