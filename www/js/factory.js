angular.module('starter.factory', [])

    .factory('SqlWork', ['$cordovaSQLite', '$q', function ($cordovaSQLite, $q) {
        return {
            insert: function (_info, loc_lat, loc_long) {
                var query = "INSERT INTO info_tree (nome_pop, nome_cie, info, loc_lat, loc_long) VALUES (?,?,?,?,?)";
                var values = [_info.nome_pop, _info.nome_cie, _info.info, loc_lat, loc_long];

                $cordovaSQLite.execute(db, query, values).then(
                    function (res) {
                        console.log('INSERTED ID: ' + res.insertId);
                    },
                    function (err) {
                        console.log('ERROR: ' + err);
                    }
                );
            },
            select: function () {
                var query = "SELECT * FROM info_tree";
                var result = [];

                $cordovaSQLite.execute(db, query, []).then(
                    function (res) {
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++){
                                result.push({id: res.rows[i].id, nome: res.rows[i].nome_pop});
                            }
                        } else {
                            console.log('No records found');
                        }
                    }
                );
                return result;
            }
        }
    }])