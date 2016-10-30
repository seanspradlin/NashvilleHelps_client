(function(){
    angular.modeul('nashhelps.agency')
        .factory('agencyService', agencyService);
    
    agencyService.$inject = ['$http', 'api'];

    function agencyService($http, api){
        var agencyApi = api.baseUrl + 'agencies';

        function getAgencies(){}
        function addServiceToAgency(){}
        function removeServiceFromAgency(){}
        function createRegistrationTokenForAgency(){}
        function addAgency(){}
        function deleteAgency(){}
        function updateAgency(){}


        return {
            getAgencies: getAgencies,
            addServiceToAgency: addServiceToAgency,
            removeServiceFromAgency: removeServiceFromAgency,
            createRegistrationTokenForAgency: createRegistrationTokenForAgency,
            addAgency: addAgency,
            deleteAgency: deleteAgency,
            updateAgency: updateAgency
        }
        
    }

})();