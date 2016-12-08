(function(){
    angular.module('nashhelps').factory('accountService', ['$http', '$q', 'api', function($http, $q, api){
        var accountApiUrl = api.baseUrl + 'account/'
        
        var currentAccount;

        var login = function(creds){
            return $http.post(accountApiUrl + 'login', creds)
                .then(function(res){
                    return res.data;
                });
        };

        var register = function(creds){
            return $http.post(accountApiUrl + 'register', creds)
                .then(function(res){
                    return res.data;
                });
        };

        var logout = function(){
            return $http.post(accountApiUrl + 'logout')
                .then(function(res){
                        return res.data;
                    });
        }

        var changePassword = function(creds){
            return $http.post(accountApiUrl + 'password', {'password': creds})
            .then(function(res){
                return res.data;
            });
        }
        
        var getAccount = function(){
            return  $http.get(accountApiUrl)
                .then(function(res){
                    return res.data;
                });
        }


        var updateAccount = function(acc){
            return $http.post(accountApiUrl, acc)
            .then(function(res){
                    return res.data;
                });
        }

        return {
            changePassword: changePassword, 
            getAccount: getAccount,
            login: login,
            logout: logout,
            register: register,
            updateAccount: updateAccount
        }
    }]);
})();