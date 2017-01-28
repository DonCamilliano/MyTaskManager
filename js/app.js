var app = angular.module("myApp", []);

app.controller('tasksContr',['$http','$scope', function($http,$scope) {
    var show = 0;
    getTasks();
    function getTasks() {
        $http.post("php/getTasks.php").success(function(data) {
            $scope.tasks = data;
            $scope.galyph = !$scope.galyph;
        });
    }
    $scope.addTask = function(input) {
         $http.post("php/Add.php?text="+input).success(function(data) {
             $scope.inputShow = 'FALSE';
             getTasks();
        });
    };
    $scope.Delete = function(id,task) {
         $http.post("php/Delete.php?id="+id).success(function(data) {
            getTasks();
        });
    };
    $scope.ChangeStatus = function(id,status) {
        if (status === '0') {
            status = '1';      
        } else {
            status = '0';
        }
        $http.post("php/changeStat.php?taskID="+id+"&status="+status).success(function(data) {
            getTasks();
        }); 
    };
    $scope.Edit = function(id, text, status) {
        console.log(typeof status);
        if (status === '0') {
            $scope.arr = [id,text];
            $scope.show = 'TRUE';
        }
    };
    $scope.Save = function(tab) {
        $http.post("php/Update.php?taskID="+tab[0]+"&status="+tab[1]).success(function(data) {
            $scope.show = 'FALSE';
            getTasks();
        });
    };
}]);