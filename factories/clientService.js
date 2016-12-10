(function(){
    angular.module('nashhelps')
        .factory('clientService', clientService);
    
    clientService.$inject = ['$http', 'api'];

    function clientService($http, api){
        var clientApi = api.baseUrl + "clients";
        
        function addClient(client){
            return $http.post(clientApi, client).then(
                function(res){
                    return res.data;
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

        function getReferrals(){
            return getClients().then(function(res){
                var referrals = [];
                res.forEach(function(value, index, array){
                    referrals = referrals.concat(value.referrals);
                });
                return referrals;                              
            })
        }

        function completeReferral(referral){
           return $http.post(clientApi + "/" + referral.client_id + '/service/' + referral.service_id, referral)
                .then(
                    function(res){
                    return res.data;
                });
        }

        function editClient (client){
            return $http.put(clientApi + "/" + client.client_id, client);
        }
        
        function deleteClient (clientId){
            return $http.delete(clientApi + "/" + client.client_id);
        }
        
        return {
            addClient: addClient,
            getClients: getClients,
            getReferrals: getReferrals,
            completeReferral: completeReferral,
            editClient: editClient,
            deleteClient: deleteClient
        }
    }
})();