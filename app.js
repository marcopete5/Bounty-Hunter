var app = angular.module('myApp', []);

app.service('bountyService', ['$http', function ($http){


	this.getBounties = function(){
		return $http.get('/api/bounty')
			.then(function(response){
				return response.data;
			})
	}

 this.postBounties = function(newBounty){
		return $http.post('/api/bounty', newBounty)
			.then(function(response){
				return response;
			})
	}

}]);

app.filter('liveDie', function(bountyService){

	return function (input){

		if (input === 'true'){
			return 'Living';
	} else {
			return 'Dead';
	}
	
	};

	
});

app.controller('mainController', ['$scope', '$http', 'bountyService', function ($scope, $http, bountyService){

	bountyService.getBounties().then(function(res){
		console.log(res);
		$scope.bounties = res;
	})

	$scope.living = true;
	$scope.dead = false;


	$scope.addBounty = function(info){
		var newBounty = angular.copy(info);
		$scope.bounties.push(newBounty);
		$scope.newBounty = {};

		bountyService.postBounties(info);
	}


}]);

