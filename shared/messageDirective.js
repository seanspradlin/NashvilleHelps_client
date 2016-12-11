(function(){
    angular.module('nashhelps')
        .directive('myMessage', myMessage);
    
    function myMessage(){
        return {
            scope: {
                message: '='
            },
            templateUrl: './shared/err.html',
            restrict: 'E',
            link: function(scope, element, attr){
            }
        }
    }
})();