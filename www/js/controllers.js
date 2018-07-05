angular.module('starter.controllers', [])

  .controller('EditorCtrl', ['$scope', 'TreeService', '$state', 'SendData', function ($scope, TreeService, $state, SendData) {
    var self = this;

    self.result = TreeService.list();

    self.editar = function (id) {
      $state.go('tab.editar', { id: id });
    }

    self.delete = function (id) {
      TreeService.delete(id);
    }

    self.sendTree = function () {
      var count = TreeService.list();
      for (var i = 0; i < count.length; i++) {
        var trees = [];
        TreeService.get(i).then(function (data) {
          trees.push(data);
          console.log(trees)
          // SendData.send(tree);
        })
      }
    }

  }])


  .controller('EditarCtrl', ['TreeService', '$stateParams', 'PositionService', '$ionicLoading', function (TreeService, $stateParams, PositionService, $ionicLoading) {
    var self = this;
    self.title = "Editar";
    self.tree = {};
    self.pos = {};

    self.id = $stateParams.id;

    TreeService.get(self.id).then(function (res) {
      console.log(res);
      self.tree = res;
      self.pos.coords = res.loc;
      console.log(res);
    });

    self.getPosition = function () {
      var loading =
        $ionicLoading.show({
          content: 'Loading...',
          duration: 3000
        })
      PositionService.pos().then(function (data) {
        self.pos = data;
        loading.hide();
      });
    }

    self.execute = function (_info, loc_lat, loc_long) {
      _info.loc = {
        latitude: loc_lat,
        longitude: loc_long
      }

      TreeService.update(self.id, _info);



      delete self.tree;
      delete self.pos;
    }

  }])

  .controller('MapCtrl', ['PositionService', '$scope', '$ionicLoading', '$cordovaFile', 'TreeService', function (PositionService, $scope, $ionicLoading, $cordovaFile, TreeService) {

    var self = this;

    self.title = "Cadastrar";

    self.tree = {};
    self.pos = {};

    self.pos = "teste";


    self.execute = function (_info, loc_lat, loc_long) {
      _info.loc = {
        latitude: loc_lat,
        longitude: loc_long
      }

      TreeService.put(_info);

      delete self.tree;
      delete self.pos;
    }

    self.limpar = function () {
      delete self.tree;
      delete self.pos;
    }

    self.mapCreated = function (map) {
      self.map = map;
    };

    self.getPosition = function () {
      var loading =
        $ionicLoading.show({
          content: 'Loading...',
          duration: 3000
        })
      PositionService.pos().then(function (data) {
        self.pos = data;
        loading.hide();
      });
    }
  }]);
