/* 
 * create by pantha istiaque
 * for donar view.
 */


var app = angular.module("donarApp", []);
var url = 'http://localhost:8080/doctor_09/api.';//common url
//============================Donar ctrl=========================================
app.controller("donarCtrl", function ($scope, $http) {
    $scope.districts = [];
    $scope.thanas = [];
    $scope.blGroups = [];
    $scope.donars = [];

    $scope.donarSearch = {
        disId: -1,
        thaId: -1,
        blGroId: -1
    };
    //now load data form sarver genarate JSON file
    districtData();
    blGroupData();
    donarData("/");

    $scope.setDistrict = function (districtSource) {
        console.log(districtSource.disId + "========" + districtSource.disName);
        $scope.donarSearch.thaId = -1;
        donarData("_districtid/" + districtSource.disId);
        thanaData(districtSource.disId);
        $scope.donarSearch.disId = districtSource.disId;
    };
    $scope.setThana = function (thanaSource) {
        console.log(thanaSource.thaId + "========" + thanaSource.thaName);
        donarData("_thanaid/" + thanaSource.thaId);
        $scope.donarSearch.thaId = thanaSource.thaId;
    };
//    ========================================================================
    $scope.setBlGroup = function (blGroupSource) {
        console.log(blGroupSource.blGroId + "========" + blGroupSource.blGroName);
        if ($scope.donarSearch.disId == -1 && $scope.donarSearch.thaId == -1) {
            donarData("_bloodid/" + blGroupSource.blGroId);
        } else if ($scope.donarSearch.thaId != -1) {
            donarData("_thana/" + $scope.donarSearch.thaId+ "/" +blGroupSource.blGroId);
        }else{
            donarData("_bloodid/" + blGroupSource.blGroId);
        }
        $scope.donarSearch.blGroId = blGroupSource.blGroId;
    };
    //=========================Private methode for Donar=====================================

    function  donarData(parameter) {
        $http({
            method: 'GET',
            url: url + 'donar' + parameter
        }).then(function successCall(response) {
            $scope.donars = response.data;
            console.log($scope.donars[0].donName);
            console.log($scope.donars.length);
        }, function errorCallback(response) {
            console.log(response);
        });
    }


    function districtData() {
        $http({
            method: 'GET',
            url: url + 'district'
        }).then(function successCall(response) {
            $scope.districts = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    function thanaData(disId) {
        $http({
            method: 'GET',
            url: url + 'thana_did/' + disId
        }).then(function successCall(response) {
            $scope.thanas = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    function blGroupData() {
        $http({
            method: 'GET',
            url: url + 'blgroup'
        }).then(function successCall(response) {
            $scope.blGroups = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});