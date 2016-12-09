(function(){
    angular.module('nashhelps')
        .service('reportBuilder', reportBuilder);
    
    reportBuilder.$inject = ['clientService', 'agencyService', 'servicesService'];

    function reportBuilder(clientService, agencyService, servicesService){
        return {};
    }
})();