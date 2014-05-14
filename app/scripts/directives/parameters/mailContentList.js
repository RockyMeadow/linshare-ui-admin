'use strict';

angular.module('linshareAdminApp').directive('lsMailContentList', [
  function() {
    return {
      restrict: 'A',
      controller: ['$scope', '$filter', '$log', 'ngTableParams', 'Domain', 'MailContent',
        function($scope, $filter, $log, ngTableParams, Domain, MailContent) {
          $scope.$watch(Domain.getCurrent,
            function(newValue, oldValue) {
              if (angular.isDefined(newValue)) {
                $scope.domain = newValue;
                $scope.tableParams.reload();
              }
            },
            true
          );
          $scope.edit = function(mailContent) {
            MailContent.setCurrent(mailContent);
          };
          $scope.cancel = function() {
            Domain.setCurrent(undefined);
          };
          $scope.filters = {
            language: 0
          };
          $scope.tableParams = new ngTableParams({
            page: 1,        // show first page
            count: 10,      // count per page
            filter: $scope.filters,
            sorting: {
              subject: 'asc',
            }
          }, {
            debugMode: false,
            total: 0, // length of data
            getData: function($defer, params) {
              MailContent.getAll($scope.domain, function(mailContents) { 
                var filteredData = params.filter() ?
                          $filter('filter')(mailContents, params.filter()) :
                          mailContents;
                var orderedData = params.sorting() ?
                          $filter('orderBy')(filteredData, params.orderBy()) :
                          filteredData;
                params.total(orderedData.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              });
            }
          });
        }
      ],
      templateUrl: 'views/templates/parameters/mailcontent_list.html',
      replace: false
    };
  }
]);
