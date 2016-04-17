((angular) => {
  'use strict';
  class LoginCtrl {
    constructor($rootScope, $http, $state) {
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$state = $state;
      this.remember = true;
      this.user = {};
    }
    doLogin() {
      var self = this;
      console.log(self.user);
      self.$http.post(`${FC.apiHost}/login`, self.user)
        .then(res => {
          if (res.data === true) {
            var token = res.headers('x-token');
            FC.token = token;
            self.$rootScope.isLogged = true;
            self.$state.go('main');
          } else {
            alert(res.data.message);
          }
        }, res => {
          alert(res.data.message)
        });
    }
  }
  LoginCtrl.$inject = ['$rootScope', '$http', '$state'];

  angular.module('flayingchat-app').controller('LoginCtrl', LoginCtrl);

})(window.angular);
