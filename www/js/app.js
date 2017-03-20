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
        controller: "MapCtrl",
        controllerAs: "ctrl",
        views: {
          'tab-cadastro': {
            templateUrl: 'templates/new.html'
          }
        },

      })
      .state('tab.editar', {
        url: '/editar/:id',
        views: {
          'tab-editar': {
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
    });
  })
