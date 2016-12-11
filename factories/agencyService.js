(function(){
    angular.module('nashhelps')
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

        function addServiceToAgency(serviceId, agencyId){
            var data = {
                agency_id: agencyId,
                service_id: serviceId
            };
            return $http.post(agencyApi + agencyId + "/services", data)
                .then(function(res){
                    return res.data;
                });
        }

        function removeServiceFromAgency(serviceId, agencyId){
            return $http.delete(agencyApi + agencyId + "/services/" + serviceId)
                .then(function(res){
                    return res.data;
                });
        }

        function createRegistrationTokenForAgency(newUser){
            return $http.post(agencyApi + newUser.agency_id + "/token/", newUser)
            .then(function(res){
                    return res.data;
                });
        }
        
        function addAgency(agency){
            return $http.post(agencyApi, agency)
                .then(function(res){
                    return res.data;
                })
        }
        
        function deleteAgency(agencyId){
            return $http.delete(agencyApi + agency_id);
        }

        function updateAgency(agency){
            return $http.put(agencyApi + agency.agency_id, agency)
                .then(function(res){ 
                    return res; 
                });
        }


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
