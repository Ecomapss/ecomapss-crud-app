angular.module('starter.controllers', [])

  .controller('EditorCtrl', ['$scope', '$cordovaSQLite','SqlWork', function ($scope, $cordovaSQLite, SqlWork) {
    var self = this;
    self.result = [];

    self.getDados = function () {
      self.result = SqlWork.select();
    }

  }])

  .controller('MapCtrl', ['$scope', '$ionicLoading', '$cordovaFile', '$cordovaSQLite', 'SqlWork', function ($scope, $ionicLoading, $cordovaFile, $cordovaSQLite, SqlWork) {

    var self = this;

    self.pos = "teste";


    self.deleteDb = function () {
      $cordovaSQLite.deleteDB("dados.db");
    }

    self.execute = function (_info, loc_lat, loc_long) {
      SqlWork.insert(_info, loc_lat, loc_long);
    }

    self.mapCreated = function (map) {
      self.map = map;
    };

    self.GetPosition = function () {
      self.loading = $ionicLoading.show({
        content: 'Localizando <ion-spinner></ion-spinner>',
        showBackdrop: false
      });
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        self.pos = pos;
        $scope.$apply();
        self.loading.hide();
      }, function (error) {
        alert('Erro ao procurar localização: ' + error.message);
      });
    }
  }]);
