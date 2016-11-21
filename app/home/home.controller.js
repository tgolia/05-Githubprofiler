(function() {
    'use strict';

    angular
        .module('app')
        .controller('GithubController', GithubController);

    GithubController.$inject = ['$http'];

    function GithubController($http) {
        vm.callGithubApi = callGithubApi;
    }

    /////////////////////////

    /* @ngInject */
    function callGithubApi() {
        $http
        .get('http://api.github.com/users/cameronoca')
        .then(function(response) {
        	vm.cameron = response.data;
        })
        .catch(function(error) {
        	alert('An error occured downloading Cameron from GitHub');
        });
    }
})();