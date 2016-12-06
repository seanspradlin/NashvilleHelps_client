(function(){
    angular.module('nashhelps')
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

        function getReferrals(){
            return getClients().then(function(res){
                console.log(res);
                var referrals = [];
                res.forEach(function(value, index, array){
                    referrals = referrals.concat(value.referrals);
                });
                return referrals;                              
            })
        }

        function completeReferral(referral){
           return $http.post(clientApi + "/" + referral.client_id + '/service/' + referral.service_id)
                .then(
                    function(res){
                    return res;
                });
        }
        
        return {
            addClient: addClient,
            getClients: getClients,
            getReferrals: getReferrals,
            completeReferral: completeReferral
        }
    }
})();