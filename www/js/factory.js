angular.module('starter.factory', [])

    .factory('TreeService', ['$cordovaSQLite', '$q', function ($cordovaSQLite, $q) {
        var forest = JSON.parse(window.localStorage.getItem('db_tree') || '[]');

        function persistir(){
            window.localStorage.setItem('db_tree', JSON.stringify(forest));
        }

        return {
            list: function () {
                return forest;
            },
            put: function (tree) {
                forest.push(tree);
                persistir();
            },
            get: function (id) {
                return forest[id];
            },
            delete: function (id) {
                forest.splice(id, 1);
                persistir();
            },
            update: function (id, tree) {
                forest[i] = tree;
                persistir();
            }

        }
    }])