(function(){
    angular.module('nashhelps').factory('accountService', accountService);
    
    accountService.$inject = ['$http', 'api', 'sessionManager'];

    function accountService ($http, api, sessionManager){
        var accountApiUrl = api.baseUrl + 'account/'
        
        var login = function(creds){
            return $http.post(accountApiUrl + 'login', creds)
                .then(function(res){
                    sessionManager.Create(res.data);
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
                        sessionManager.Destroy();
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
                    session.Create(res.data); //update session
                    return res.data;
                });
        }


        var updateAccount = function(acc){
            return $http.post(accountApiUrl, acc)
            .then(function(res){
                    return res.data;
                });
        }

        var currentUser = sessionManager.user;

        var isAuthenticated = sessionManager.isAuthenticated

        var isAuthorized = sessionManager.isAuthorized;

        return {
            changePassword: changePassword, 
            getAccount: getAccount,
            login: login,
            logout: logout,
            register: register,
            updateAccount: updateAccount,
            isAuthorized: isAuthorized,
            isAuthenticated: isAuthenticated,
            currentUser: currentUser
        }

    };
})();