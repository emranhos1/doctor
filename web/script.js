///<reference path="angular.main.js"/>
var app = angular.module("Demo", ["ngRoute"])
        .config(function($routeProvider) {
         $routeProvider.caseInsensitiveMatch=true;   
         $routeProvider
                    .when("/index", {
                        templateUrl: "Template/index.html",
                        //controller: "homeController"
                    })
                    .when("/login", {
                        templateUrl: "Template/login.html",
                       // controller: "coursesController"
                    })
                    .when("/ginipig", {
                        templateUrl: "Template/ginipig.html",
                        //controller: "studentsController"
                    })
                    .when("/students/:id", {
                        templateUrl: "Template/studentsDetails.html",
                        //controller: "studentsDetailController"
                    })
                    .when("/ng-model", {
                        templateUrl: "Template/ng-model-Example.html"
                        //controller: "imagesController"
                    })
                    .when("/angularJS_Expressions", {
                        templateUrl: "Template/angularJS_Expressions.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/angularJS_Numbers", {
                        templateUrl: "Template/angularJS_Numbers.html"
                        //controller: "studentsDetailController"
                    })
                     .when("/angularJS_Strings", {
                        templateUrl: "Template/angularJS_Strings.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/angularJS_Objects", {
                        templateUrl: "Template/angularJS_Objects.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/angularJS_Arrays", {
                        templateUrl: "Template/angularJS_Arrays.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/angularJS_color", {
                        templateUrl: "Template/angularJS_color.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/index2", {
                        templateUrl: "Template/index2.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/ng-model-Derective", {
                        templateUrl: "Template/ng-model-Derective.html"
                        //controller: "studentsDetailController"
                    })
                    .when("/addStudent", {
                        templateUrl: "Template/test.html",
                        //controller: "studentAddControllers"
                    })
                     .otherwise({
                         redirectTo:"/index"
                     });
        });
        