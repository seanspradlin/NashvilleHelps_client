(function(){
    angular.module('nashhelps')
        .controller('reportController', reportController);
    
    reportController.$inject = ['$scope', 'reportBuilder', 'accountService', '$location'];

    function reportController($scope, reportBuilder, accountService, $location){
        $scope.report = {};
        function init(){
            reportBuilder.generateReport()
                .then(function(res){
                    $scope.report = res;
                    console.log($scope.report);
                })
        }
        

        function getAccount(){
            accountService.getAccount()
                .then(
                    function(res){
                        if (!res.is_admin){
                            $location.path('/account');
                        }
                        init();
                    },
                    function redirect(err){
                        $location.path('/account/login');
                    })
        }
        getAccount();
    }
})();