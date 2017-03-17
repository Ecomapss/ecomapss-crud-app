var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.factory', 'ngCordova'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.cadastro', {
        url: '/cadastro',
        views: {
          'tab-cadastro': {
            templateUrl: 'templates/new.html'
          }
        }
      })
      .state('tab.editor', {
        url: '/editor',
        views: {
          'tab-editor': {
            templateUrl: 'templates/editor.html'
          }
        }

      })

    $urlRouterProvider.otherwise('/tab/cadastro');
  })

  .run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      if (window.cordova) {
        db = $cordovaSQLite.openDB({ name: "dados.db", location: 'default' });
        console.log('db criado android');
      } else {
        db = window.openDatabase('dados.db', '1', 'Dados DB', 200000);
        console.log('db criado no navegador');
      }

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS info_tree (id INTEGER PRIMARY KEY AUTOINCREMENT,nome_pop text,nome_cie text,info text, loc_lat text, loc_long text)').then(function () {
        console.log("tabela criada");
      });
    });
  })
