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
            templateUrl: 'templates/new.html',
            controller: "MapCtrl as ctrl"
          }
        },

      })      
      .state('tab.editor', {
        url: '/editor',
        views: {
          'tab-editor': {
            templateUrl: 'templates/editor.html',
            controller: "EditorCtrl as ctrl"
          }
        }

      })
      .state('tab.editar', {
        url: '/editar/:id',
        views: {
          'tab-editor': {
            templateUrl: 'templates/new.html',
            controller: "EditarCtrl as ctrl",
            title: "Editar"
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
