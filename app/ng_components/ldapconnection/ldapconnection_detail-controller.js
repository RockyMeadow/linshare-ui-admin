'use strict';

angular.module('linshareAdminApp')
  .controller('LdapConnectionDetailCtrl',
    ['$scope', '$state', '$modal', '$log', 'LdapConnection', 'currentLdapConnection',
    function($scope, $state, $modal, $log, LdapConnection, currentLdapConnection) {
      $scope.state = $state.params.formState;
      $scope.ldapConnection = currentLdapConnection || {};

      $scope.submit = function() {
        if ($scope.state === 'edit') {
          LdapConnection.update(
            $scope.ldapConnection,
            function successCallback() {
              $scope.cancel();
            }
          );
        } else if ($scope.state === 'create') {
          LdapConnection.add(
            $scope.ldapConnection,
            function successCallback() {
              $scope.cancel();
            }
          );
        } else {
          $log.error('Invalid state');
        }
      };
      $scope.remove = function() {
        if ($scope.state === 'edit') {
          var modalInstance = $modal.open({
            templateUrl: 'ng_components/common/confirm_modal.tpl.html',
            controller: 'ConfirmDialogCtrl',
            resolve: {
              content: function() {
                return 'DOMAIN_PATTERNS.CONFIRM_DELETE_FORM.PARAGRAPH';
              }
            }
          });
          modalInstance.result.then(
            function validate() {
              LdapConnection.remove(
                $scope.ldapConnection,
                function successCallback() {
                  $scope.cancel();
                }
              );
            }, function cancel() {
              $log.debug('Deletion modal dismissed');
            }
          );
        } else {
          $log.error('Invalid state');
        }
      };
      $scope.cancel = function() {
        $state.go('ldapconnection.list');
      };
      $scope.reset = function() {
        $state.reinit();
      };
    }]
  );

