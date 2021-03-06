// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service for showing the hint and solution modals.
 */

oppia.factory('HintAndSolutionModalService', [
  '$uibModal', 'UrlInterpolationService', 'HintManagerService',
  'SolutionManagerService', 'ExplorationPlayerService',
  'PlayerPositionService',
  function($uibModal, UrlInterpolationService, HintManagerService,
           SolutionManagerService, ExplorationPlayerService,
           PlayerPositionService) {
    return {
      displayHintModal: function() {
        $uibModal.open({
          templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
            '/pages/exploration_player/hint_and_solution_modal_directive.html'),
          backdrop: 'static',
          controller: [
            '$scope', '$uibModalInstance',
            function($scope, $uibModalInstance) {
              $scope.isHint = true;
              $scope.hint = HintManagerService.consumeHint();
              $scope.closeModal = function() {
                $uibModalInstance.dismiss('cancel');
              };
            }
          ]
        });
      },
      displayHintModalForIndex: function(index) {
        return $uibModal.open({
          templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
            '/pages/exploration_player/hint_and_solution_modal_directive.html'),
          backdrop: 'static',
          controller: [
            '$scope', '$uibModalInstance',
            function($scope, $uibModalInstance) {
              $scope.isHint = true;
              $scope.hint = (
                index === HintManagerService.getCurrentHintIndex() ?
                  HintManagerService.consumeHint() :
                  HintManagerService.getHintAtIndex(index));
              $scope.closeModal = function() {
                $uibModalInstance.dismiss('cancel');
              };
            }
          ]
        });
      },
      displaySolutionModal: function() {
        return $uibModal.open({
          templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
            '/pages/exploration_player/hint_and_solution_modal_directive.html'),
          backdrop: 'static',
          controller: [
            '$scope', '$uibModalInstance',
            function($scope, $uibModalInstance) {
              $scope.isHint = false;
              var solution = SolutionManagerService.viewSolution();
              var interaction = ExplorationPlayerService.getInteraction(
                PlayerPositionService.getCurrentStateName());
              $scope.solution = solution.getOppiaResponseHtml(interaction);
              $scope.closeModal = function() {
                $uibModalInstance.dismiss('cancel');
              };
            }
          ]
        });
      }
    }
  }
]);
