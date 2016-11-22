(function() {
    'use strict';

    angular
        .module('app')
        .controller('GithubController', GithubController);

    GithubController.$inject = ['$http'];

    function GithubController($http) {
        var vm = this;

        vm.callGithubApi = callGithubApi;
        vm.getUserRepos = getUserRepos;

        vm.repos=[];
        vm.username='';
        vm.repoButton='View Repositories';

        vm.hideOrShowReposTable = function() {
            if (vm.repoButton === 'View Repositories') {
                vm.repoButton = 'Hide Repositories';
                document.getElementById('table').style.visibility='visible';
            } else {
                vm.repoButton = 'View Repositories';
                document.getElementById('table').style.visibility='hidden';
            }
        }

        vm.hideReposTable = function() {
            vm.repoButton = 'View Repositories';
            document.getElementById('table').style.visibility='hidden';
        }

        vm.isHireableOrNot = function() {
            if (vm.user.hireable == null) {
                vm.user.hireable = 'Not looking for work';
                vm.hireableColor = 'text-danger';
            } else {
                vm.user.hireable = 'Looking for work!';
                vm.hireableColor = 'text-success';
            }
        }
        vm.checkForRepoDescription = function() {
            for (var i=0;i<vm.repos.length;i++) {
                if (vm.repos[i].description == null) {
                    vm.repos[i].description = 'No description provided';
                }
            }
        }

        vm.showUserDetails = function() {
            document.getElementById('details').style.visibility='visible';
        }

        /////////////////////////

        /* @ngInject */
        function callGithubApi(username) {
            $http
            .get('http://api.github.com/users/'+username+'?access_token=0cd910c1c4cc6acf2244aed5ab1ccb3ad206203e')
            .then(function(response) {
            	vm.user = response.data;
                console.log(response);
                vm.isHireableOrNot();
                vm.showUserDetails();
                vm.username = username;
                vm.hideReposTable();
            })
            .catch(function(error) {
            	alert('An error occured downloading '+username+' from GitHub');
            });
        }
        
        function getUserRepos(username) {
             $http
            .get('http://api.github.com/users/'+username+'/repos?access_token=0cd910c1c4cc6acf2244aed5ab1ccb3ad206203e')
            .then(function(response) {
                vm.repos = response.data;
                vm.hideOrShowReposTable();
                vm.checkForRepoDescription();
            })
            .catch(function(error) {
                alert('An error occured downloading '+username+' from GitHub'); //TODO: provide specific error message based on code
            });
        }
    }
})();
