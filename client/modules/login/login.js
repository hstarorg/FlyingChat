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
          self.$rootScope.isLogged = true;
          self.$state.go('main');
        });
    }
  }
  LoginCtrl.$inject = ['$rootScope', '$http', '$state'];

  angular.module('flayingchat-app').controller('LoginCtrl', LoginCtrl);

})(window.angular);
