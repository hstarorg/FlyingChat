; (function ($) {
  'use strict';

  $(function () {
    $('#btn-login').on('click', function () {
      var username = $('#input-username').val();
      var password = $('#input-pwd').val();
      console.log(username, password);
      location.href = "/main.html";
    });
  });
})(window.jQuery);