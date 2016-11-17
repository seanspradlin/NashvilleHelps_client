(function(){
    angular.module('nashhelps')
        .factory('reportService', reportService);
    
    reportService.$inject = [clientService, agencyService, servicesService];

    function reportService(clientService, agencyService, servicesService){
        function init(){
            getClients();
            getAgencies();
            getServices();
            getReferrals();
        }

        var agencies = [];
        var clients = [];
        var referrals = [];
        var services = [];

        function generateServicesTable(){

        }

        function generateClientTable(){

        }

        function generateAgencyTable(){

        }

        function getClients(){}
        function getAgencies(){}
        function getServices(){}
        function getReferrals(){}

        function populateService(id){
            //gives a service id, returns service name
        }

        function populateAgency(id){}

        function populateClient(id){}

        init();

        return {
            generateServicesTable: generateServicesTable,
            generateClientTable: generateClientTable,
            generateAgencyTable: generateAgencyTable
        }
    }
})();