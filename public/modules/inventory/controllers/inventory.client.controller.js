'use strict';

angular.module('inventory').controller('inventoryController', ['$scope', '$stateParams', '$location', 'Inventory',
	function($scope, $stateParams, $location, Inventory) {
		//$scope.authentication = Authentication;

		$scope.addPart = function() {
			var part = new Parts({
				title: this.title
			});
			part.$save(function(response) {
				$location.path('parts/' + response._id);

				$scope.title = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.removePart = function(part) {
			if (part) {
				part.$remove();

				for (var i in $scope.parts) {
					if ($scope.parts[i] === part) {
						$scope.parts.splice(i, 1);
					}
				}
			} else {
				$scope.part.$remove(function() {
					$location.path('parts');
				});
			}
		};

		$scope.createPart = function() {
			var part = $scope.part;

			part.$update(function() {
				$location.path('parts/' + part._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.editPart = function() {
			$scope.parts = parts.query();
		};

		$scope.listInventory = function() {
			$scope.part = parts.get({
				partId: $stateParams.partId
			});
		};
	}
]);
