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

        function getClients(){
            clientService.getClients()
            .then(
                function(res){
                    clients = res;
                },
                function(err){

                }
            );
        }
        
        function getAgencies(){
            agencyService.getAgencies()
            .then(
                function(res){
                    agencies = res;                },
                function(err){

                }
            );
        }

        function getServices(){
            servicesService.getServices()
            .then(
                function(res){
                    services = res;
                }, function (err){

                }
            );
        }
        function getReferrals(){
            clientServices.getReferrals()
            .then(
                function(res){
                    referrals = res;
                },
                function(err){

                }
            )
        }

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