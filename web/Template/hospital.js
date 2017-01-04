/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("hospitalApp", []);
var url = 'http://localhost:8080/doctor_09/api.';//common url
//============================Hospital ctrl=========================================
app.controller("hospitalCtrl", function ($scope, $http) {
    $scope.districts = [];
    $scope.thanas = [];
    $scope.hospitals = [];
    $scope.hospitalModals = [];

    $scope.hospitalSearch = {
        disId: -1,
        thaId: -1,
        posurl: '',
        location: ''
    };
    //now load data form sarver genarate JSON file
    districtData();
    hospitalData("/");

    $scope.setDistrict = function (districtSource) {
        console.log(districtSource.disId + "========" + districtSource.disName);
        thanaData(districtSource.disId);
        hospitalData("_disid/" + districtSource.disId);
    };

    $scope.setThana = function (thanaSource) {
        console.log(thanaSource.thaId + "========" + thanaSource.thaName);
        hospitalData("_thanaid/" + thanaSource.thaId);
    };

    $scope.setLocation = function (locationSource) {
        console.log(locationSource.thaName + "========" + locationSource.hosLocation);
        hospitalData("_location/" + locationSource.hosLocation);
    };

    $scope.hosDetails = function (hos) {
        console.log(hos.hosId + "========" + hos.hosName);
        hospitalDataModal("/" + hos.hosId);
    };
    //=========================Private methode for Donar=====================================

    function  hospitalData(parameter) {
        $http({
            method: 'GET',
            url: url + 'hospital' + parameter
        }).then(function successCall(response) {
            $scope.hospitals = response.data;
            console.log($scope.hospitals[0].hosName);
            console.log($scope.hospitals.length);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    function  hospitalDataModal(parameter) {
        $http({
            method: 'GET',
            url: url + 'hospital' + parameter
        }).then(function successCall(response) {
            $scope.hospitalModals = response.data;
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


});