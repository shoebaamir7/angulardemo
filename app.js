var app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "templates/login.html",
                controller: "loginCtrl"
            })
            .when("/home", {
                templateUrl: "templates/home.html",
                controller: "homeCtrl"
            });

});
app.run(function($rootScope) {
    $rootScope.uname = '';
});
app.controller("loginCtrl", function ($scope, $location,$rootScope) {
    $scope.username;
    $scope.password;
    $scope.checkValidUser = function () {
        if ($scope.username == 'clarion@clarion.com' && $scope.password == 'Clarion123'){
            var res = $scope.username.split("@");
            $rootScope.uname = res[0];
            $location.path("/home");
        } else {
            $scope.invalidlogin = "Invalid Credentials!";
        }
    }
});
app.controller("homeCtrl", function ($scope,$rootScope) {
    $scope.products = [];
    $scope.checkdata = true;
    $scope.username = $rootScope.uname;
    $scope.addProduct = function () {
        var data = {productname: $scope.productname, productrate: $scope.productrate,quality:$scope.quality};
        $scope.products.push(data);
        $scope.checkdata = false;
        jQuery.noConflict();
        jQuery(".modal .close").click();
        /*$scope.productname = '';
        $scope.productrate = '';
        $scope.quality = '';*/
    };
    $scope.delete = function (index) {
        $scope.products.splice(index, 1);
        if($scope.products.length == 0){
            $scope.checkdata = true;
        }
    };
});