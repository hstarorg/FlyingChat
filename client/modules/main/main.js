((angular) => {
  'use strict';
  class MainCtrl {
    constructor($http, $state, $compile, $scope) {
      this.$http = $http;
      this.$compile = $compile;
      this.$scope = $scope;
      this.users = [{
        nickName: '神仙姐姐'
      }];
      for (var i = 0; i < 50; i++) {
        this.users.push({
          id: i,
          nickName: '神仙姐姐'
        });
      }
      this.temp = $('#chat-template').html();
      $('.tab-content').niceScroll();
    }
    openChat(userId) {
      var self = this;
      layer.open({
        type: 1,
        title: '<i class="fa fa-user"></i> 神仙姐姐',
        area: ['600px', '600px'],
        shade: 0,
        skin: 'layui-layer-lan',
        moveType: 1,
        maxmin: true,
        content: self.temp,
        zIndex: layer.zIndex, //重点1
        success: function (layero, layerId) {
          self.$scope.userId = userId;
          self.$scope.layerId = layerId;
          self.$compile(layero)(self.$scope);
          layero.find('.chat-container').niceScroll();
          console.log('success');
          layer.setTop(layero); //重点2
        }
      });
    }
  }
  MainCtrl.$inject = ['$http', '$state', '$compile', '$scope'];

  angular.module('flayingchat-app').controller('MainCtrl', MainCtrl);

})(window.angular);
