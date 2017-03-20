angular.module('starter.controllers', [])

  .controller('EditorCtrl', ['$scope','TreeService','$state', function ($scope, TreeService, $state) {
    var self = this;
    self.result = TreeService.list();


    self.editar = function (id) {
      $state.go('tab.editar', {id : id});
    }

  }])

  .controller('EditarCtrl', ['TreeService', '$stateParams', function (TreeService, $stateParams){
    var self = this;
    
    self.id = $stateParams.id;

    self.tree = TreeService.get(self.id);

    
  }])

  .controller('MapCtrl', ['$scope', '$ionicLoading', '$cordovaFile', 'TreeService', function ($scope, $ionicLoading, $cordovaFile, TreeService) {

    var self = this;

    self.pos = "teste";


    self.execute = function (_info, loc_lat, loc_long) {
      _info.loc_lat = loc_lat;
      _info.loc_long = loc_long;

      TreeService.put(_info);
    }

    self.mapCreated = function (map) {
      self.map = map;
    };

    self.GetPosition = function () {
      self.loading = $ionicLoading.show({
        content: 'Localizando...',
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
