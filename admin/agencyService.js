(function(){
    angular.module('nashhelps.admin')
        .factory('agencyService', agencyService);
    
    agencyService.$inject = ['$http', 'api'];

    function agencyService($http, api){
        var agencyApi = api.baseUrl + 'agencies/';

        function getAgencies(){
            return $http.get(agencyApi).then(function(res){
                return res.data;
            })
        }
        function getAgency(id){
            return $http.get(agencyApi + id).then(function(res){
                return res.data;
            });
        }
        function addServiceToAgency(){}
        function removeServiceFromAgency(){}
        function createRegistrationTokenForAgency(){}
        function addAgency(){}
        function deleteAgency(){}
        function updateAgency(){}


        return {
            getAgencies: getAgencies,
            getAgency: getAgency,
            addServiceToAgency: addServiceToAgency,
            removeServiceFromAgency: removeServiceFromAgency,
            createRegistrationTokenForAgency: createRegistrationTokenForAgency,
            addAgency: addAgency,
            deleteAgency: deleteAgency,
            updateAgency: updateAgency
        }
        
    }

})();
