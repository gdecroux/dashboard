// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {actionbarViewName, stateName as chromeStateName} from 'chrome/state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {appendDetailParamsToUrl} from 'common/resource/resourcedetail';
import {stateName as replicaSetList} from './../list/state';
import {stateUrl} from './../state';

import {ActionBarController} from './actionbar_controller';
import {ReplicaSetDetailController} from './controller';

/**
 * Config state object for the Replica Set detail view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: appendDetailParamsToUrl(stateUrl),
  parent: chromeStateName,
  resolve: {
    'replicaSetDetail': resolveReplicaSetDetailResource,
  },
  data: {
    [breadcrumbsConfig]: {
      'label': '{{$stateParams.objectName}}',
      'parent': replicaSetList,
    },
  },
  views: {
    '': {
      controller: ReplicaSetDetailController,
      controllerAs: 'ctrl',
      templateUrl: 'replicaset/detail/detail.html',
    },
    [actionbarViewName]: {
      controller: ActionBarController,
      controllerAs: '$ctrl',
      templateUrl: 'replicaset/detail/actionbar.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function replicaSetDetailResource($resource) {
  return $resource('api/v1/replicaset/:namespace/:name');
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function replicaSetPodsResource($resource) {
  return $resource('api/v1/replicaset/:namespace/:name/pod');
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function replicaSetServicesResource($resource) {
  return $resource('api/v1/replicaset/:namespace/:name/service');
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function replicaSetEventsResource($resource) {
  return $resource('api/v1/replicaset/:namespace/:name/event');
}

/**
 * @param {!angular.Resource} kdReplicaSetDetailResource
 * @param {!./../../common/resource/resourcedetail.StateParams} $stateParams
 * @param {!./../../common/pagination/pagination_service.PaginationService} kdPaginationService
 * @return {!angular.Resource<!backendApi.ReplicaSetDetail>}
 * @ngInject
 */
export function resolveReplicaSetDetailResource(
    kdReplicaSetDetailResource, $stateParams, kdPaginationService) {
  let query = kdPaginationService.getDefaultResourceQuery(
      $stateParams.objectNamespace, $stateParams.objectName);
  return kdReplicaSetDetailResource.get(query).$promise;
}
