angular.module('starter.factory', [])

    .factory('TreeService', ['$cordovaSQLite', '$q','$ionicPopup', function ($cordovaSQLite, $q,$ionicPopup) {
        var forest = JSON.parse(window.localStorage.getItem('db_tree') || '[]');

        function persistir() {
            window.localStorage.setItem('db_tree', JSON.stringify(forest));
        }
        function show() {
            var confirmPopup = $ionicPopup.alert({
                title: 'Ação',
                content: 'Item armazenado!'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        return {
            list: function () {
                return forest;
            },
            put: function (tree) {
                forest.push(tree);
                persistir();
                show();
            },
            get: function (id) {
                var deferr = $q.defer();
                deferr.resolve(forest[id]);
                return deferr.promise;
            },
            delete: function (id) {
                forest.splice(id, 1);
                persistir();
            },
            update: function (id, tree) {
                forest[id] = tree;
                persistir();
            }

        }
    }])

    .factory('PositionService', ['$q', function ($q) {
        return {
            pos: function () {
                var deferr = $q.defer();
                navigator.geolocation.getCurrentPosition(function (pos) {
                    deferr.resolve(pos);
                }, function (error) {
                    alert('Erro ao procurar localização: ' + error.message);
                })
                return deferr.promise;
            }
        }

    }])

    .factory('SendData', ['$http', function ($http) {
        var baseURL = 'http://localhost:3000'
        return {
            send: function (tree) {
                $http.post(baseURL + '/saveData', tree).then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err);
                })
            }
        }
    }])