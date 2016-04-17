angular.module('flayingchat-app', ['ui.router'])
  .config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/404');

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'modules/login/login.html',
      controller: 'LoginCtrl as login'
    }).state('main', {
      url: '/main',
      templateUrl: 'modules/main/main.html',
      controller: 'MainCtrl as main'
    })
  }])
  .run(['$rootScope', '$state', '$timeout', ($rootScope, $state, $timeout) => {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      if (!$rootScope.isLogged && toState.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    });
  }]);