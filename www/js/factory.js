angular.module('starter.factory', [])

    .factory('TreeService', ['$cordovaSQLite', '$q', function ($cordovaSQLite, $q) {
        var forest = JSON.parse(window.localStorage.getItem('db_tree') || '[]');

        function persistir() {
            window.localStorage.setItem('db_tree', JSON.stringify(forest));
        }

        return {
            list: function () {
                return forest;
            },
            put: function (tree) {
                forest.push(tree);
                alert("Item armazenado");
                persistir();
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