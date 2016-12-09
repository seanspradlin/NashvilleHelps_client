(function(){
    angular.module('nashhelps')
        .service('sessionManager', sessionManager);

    function sessionManager(){
        this.Create = function(user){
            this.is_authenticated = true;
            this.is_authorized = user.is_admin;
            this.user = user;
        };
        this.Destroy = function(){
            this.is_authenticated = false;
            this.is_authorized = false;
            this.user = null;
        };
    }
})();