(function(){
    angular.module('nashhelps')
        .factory('userService', userService);
    
    userService.$inject = ['$http', 'api', 'agencyService'];

    function userService($http, api){
        var userApi = api.baseUrl + 'users/';

        function getUsers (){
            return $http.get(userApi)
                .then(function(res){
                    return res.data;
                });                
        }

        function deleteUser(userId){
            return $http.delete(userApi + userId)
                .then(function(res){
                    return res.data;
                });
        }

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    }

})();