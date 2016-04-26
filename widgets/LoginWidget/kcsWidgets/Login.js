define([
  'dojo/text!./Login/templates/Login.html',
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/cookie',
  'dojo/json',
  'dojo/topic',
  'dojo/_base/lang',
  "dijit/registry",
  'dojo/on',
  'jimu/utils',
  'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-1.11.2.min.js',
  'jimu/BaseWidget',
  'dojo/i18n!./kcsWidgets/Login/nls/resource.js',
  'xstyle/css!./Login/css/Login.css',
  "dijit/form/TextBox",
  'widgets/LoginWidget/Resources/libraries/prototype.js',
  'widgets/LoginWidget/Resources/wijmo/wijmo.min.js',
  'widgets/LoginWidget/Resources/wijmo/wijmo.input.min.js',
  'xstyle/css!widgets/LoginWidget/Resources/wijmo/wijmo.min.css'
], function (template, declare, _WidgetBase, _TemplatedMixin,
             _WidgetsInTemplateMixin, cookie, json, topic, lang, registry,
             on, jimuUtils, $, BaseWidget, i18n) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    // description:
    //    WAB login form
    templateString: template,
    baseClass: 'wab-login',
    widgetsInTemplate: true,
    i18n: i18n,
    loginWidget: null,
    loginInfo: null,
    // Properties to be sent into constructor
    postCreate: function () {
      this.inherited(arguments);
      console.log('app.WabLogin::postCreate', arguments);
      this.setupConnections();
      loginWidget = this;
      this.checkForUserName();
      this._bindEvents();
    },
    setupConnections: function () {
      console.log('app.WabLogin::setupConnections', arguments);
    },

    checkForUserName: function(){
      if (cookie("auth_username") != null)
      {
        document.getElementById('usernameBox').value = cookie("auth_username");
        document.getElementById('remember_me').checked = true;
        document.getElementById('usernameBox').placeholder = "";
        document.getElementById('passwordBox').focus();
      }
      else
      {
        document.getElementById('usernameBox').focus();
        document.getElementById('usernameBox').placeholder = "Username";
      }
    },

    _bindEvents: function () {
      this.own(on(this.btnLogin, 'click', lang.hitch(this, this._login)));
    },

    var: pass = document.getElementById("passwordBox"),
    pass:addEventListener("keydown", function (e) {
      if (e.keyCode === 13)
      {
        loginWidget._login()
      }
    }),

    _login: function () {
      if (document.getElementById('remember_me').checked == false)
      {
        document.cookie = "auth_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        removeCookie("auth_username");
      }

      var userBox = registry.byId("usernameBox");
      var passBox = registry.byId("passwordBox");

      $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://routemanrms.com/DashboardData/Services.DashboardService.svc/Login",
        data: {"usernameEntered": userBox.get("value"), "password": passBox.get("value")},
        contentType: "application/json; charset=utf-8",
        success: GetLoginSucceeded,
        error: ServiceFailed
      });
      function GetLoginSucceeded(results) {
        if (results.LoginResult.RMID != 0)
        {
          var userRole;
          var username;
          userRole = results.Role;
          username = results.LoginResult.UserName;
          if (document.getElementById('remember_me').checked == true)
          {
            _saveUserCookie(username);
          }

          _saveRoleCookie(userRole);

          console.log(results.LoginResult);
          var resultObject = results.LoginResult;
          _saveTokenCookie(resultObject);
          topic.publish("/app/login", (username, resultObject));

          console.log('app.WabLogin::_login: onClick: ', username);


          console.log("Login Successful RMID: " + resultObject.RMID);
          loginWidget.loginInfo = resultObject;
          topic.publish("loginWidget", (username));
          //LoadTheData();
        }
        else
        {
          alert("Incorrect Username or Password")
        }
      }

      function ServiceFailed(result) {
        Log('Service call failed: ' + result.status + '  ' + result.statusText);
      }

      function  _saveUserCookie  (username) {
        var cookieName = "auth_username";
        removeCookie(username);
        cookie(cookieName, username, {
          path: '/'
        });
        console.log(cookie(cookieName));
      }

      function  _saveRoleCookie  (role) {
        var cookieName = "auth_role";
        removeCookie(role);
        cookie(cookieName, role, {
          path: '/'
        });
      }

      function  _saveTokenCookie  (resultObject) {
        var cookieName = "LoginInfo";
        removeCookie(resultObject);
        cookie(cookieName, resultObject, {
          path: '/'
        });
      }

      function  removeCookie  (cookieName) {
        var path = '/';
        jimuUtils.removeCookie(cookieName, path);
      }
    }
  });
});
