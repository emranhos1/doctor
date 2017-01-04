/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("doctorApp", []);
var url = 'http://localhost:8080/doctor_09/api.';//common url
//============================Doctor ctrl=========================================
app.controller("doctorCtrl", function ($scope, $http) {
    $scope.districts = [];
    $scope.specialtys = [];
    $scope.thanas = [];
    $scope.hospitals = [];
    $scope.doctors = [];
    $scope.doctorsModal = [];

    $scope.doctorSearch = {
        disId: -1,
        hosId: -1
    };

    $scope.doctorFrom = {
        docName: 'Pantha',
        docMedicalDegree: ''
    };

    //now load data form sarver genarate JSON file
    districtData();
    hospitalData("/");
    specialtyData();
    doctorsData("/");

    $scope.setDistrict = function (districtSource) {
        console.log(districtSource.disId + "========" + districtSource.disName);
        $scope.doctorSearch.disId = districtSource.disId;
        $scope.doctorSearch.hosId = -1;
        thanaData(districtSource.disId);
        hospitalData("_disid/" + districtSource.disId);
        doctorsData("/district/" + districtSource.disId);
    };
    $scope.setThana = function (thanaSource) {
        console.log(thanaSource.thaId + "========" + thanaSource.thaName);
        hospitalData("_thanaid/" + thanaSource.thaId);
    };
    $scope.setHospital = function (hospitalSource) {
        console.log(hospitalSource.hosId + "========" + hospitalSource.hosName);
        doctorsData("/hospital/" + hospitalSource.hosId);
        $scope.doctorSearch.hosId = hospitalSource.hosId;
    };
    $scope.setSpecialty = function (specialtySource) {
        console.log(specialtySource.docSpeId + "========" + specialtySource.docSpeName);
        if ($scope.doctorSearch.disId == -1 && $scope.doctorSearch.hosId == -1)
            doctorsData("/Specialty/" + specialtySource.docSpeId);
        if ($scope.doctorSearch.disId != -1 && $scope.doctorSearch.hosId == -1)
            doctorsData("/district=" + $scope.doctorSearch.disId + "/Specialty=" + specialtySource.docSpeId + "");
        if ($scope.doctorSearch.disId != -1 && $scope.doctorSearch.hosId != -1)
            doctorsData("/hospital=" + $scope.doctorSearch.hosId + "/Specialty=" + specialtySource.docSpeId + "");
        $scope.doctorSearch.hosId = -1;
        $scope.doctorSearch.disId = -1;
    };

    $scope.docDetails = function (hos) {
        $scope.doctorFrom.docName = hos.docName;
        $scope.doctorFrom.docMedicalDegree = hos.docMedicalDegree;
    };
//=========================Private methode for Donar=====================================
    function  doctorsData(parameter) {
        $http({
            method: 'GET',
            url: url + 'doctor' + parameter
        }).then(function successCall(response) {
            $scope.doctors = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }


    function  hospitalData(parameter) {
        $http({
            method: 'GET',
            url: url + 'hospital' + parameter
        }).then(function successCall(response) {
            $scope.hospitals = response.data;
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

    function specialtyData() {
        $http({
            method: 'GET',
            url: url + 'dspecialty/'
        }).then(function successCall(response) {
            $scope.specialtys = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});
        