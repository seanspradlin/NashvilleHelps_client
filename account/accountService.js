(function(){
    angular.module('nashhelps.account').factory('accountService', ['$http', '$q', 'api', function($http, $q, api){
        var accountApiUrl = api.baseUrl + 'account/'
        
        var currentAccount;


        var login = function(creds){
            return $http.post(accountApiUrl + 'login', creds)
                .then(function(res){
                    return res;
                });
        };

        var register = function(creds){
            return $http.post(accountApiUrl + 'register', creds)
                .then(function(res){
                    return res;
                });
        };

        var logout = function(){
            return $http.post(accountApiUrl + 'logout')
                .then(function(res){
                        return res;
                    });
        }

        var changePassword = function(creds){
            return $http.post(accountApiUrl + 'password', creds)
            .then(function(res){
                return res;
            });
        }
        
        var getAccount = function(){
            return  $http.get(accountApiUrl)
                .then(function(res){
                    return res;
                });
        }


        var updateAccount = function(acc){
            return $http.post(accountApiUrl)
            .then(function(res){
                    return res;
                }, function(err){
                    return err;
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