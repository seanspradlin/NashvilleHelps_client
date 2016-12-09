(function(){
    angular.module('nashhelps').factory('accountService', accountService);
    
    accountService.$inject = ['$http', 'api'];

    function accountService ($http, api){
        var accountApiUrl = api.baseUrl + 'account/'
        
        var login = function(creds){
            return $http.post(accountApiUrl + 'login', creds)
                .then(function(res){
                    return getAccount();
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

        var is_authenticated = function(){
            getAccount().then(function(res){
                return true;
            },function(err){
                return false;
            })
        }
        var is_authorized = function(){
            getAccount().then(function(res){
                return res.is_admin;
            },function(err){
                return false;
            })
        }

        return {
            changePassword: changePassword, 
            getAccount: getAccount,
            login: login,
            logout: logout,
            register: register,
            updateAccount: updateAccount,
            is_authenticated: is_authenticated,
            is_authorized: is_authorized
        }

    };
})();