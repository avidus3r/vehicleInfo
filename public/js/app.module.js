var vehicleInfo = angular.module('vehcileInfo', []);

vehicleInfo.controller('MainCtrl', function($scope){
    $scope.makes = {};
});

vehicleInfo.directive('list', function() {
    return {
        restrict: 'E',
        scope:{
            selectedValue: '=?bind',
            selectedMake: '=?bind'
        },
        controller: function($scope, $element, $attrs) {
            $scope.contentUrl = '/partials/list-' + $attrs.type + '.html';

            $attrs.$observe('type',function(attr){
                $scope.contentUrl = '/partials/list-' + attr + '.html';
            });
            $scope.makes = [
                {
                    name:'Select...',
                    value:''
                },
                {
                    name: 'Ford',
                    value:'ford',
                    models:[
                        {
                            name: 'Edge',
                            value:'edge'
                        },
                        {
                            name: 'Escape',
                            value:'escape'
                        }
                    ]
                },
                {
                    name:'Acura',
                    value:'acura',
                    models:[
                        {
                            name: 'ILX',
                            value:'ilx'
                        },
                        {
                            name: 'MDX',
                            value:'mdx'
                        }
                    ]
                }
            ];
            if($attrs.type === 'model'){

            }else{
                $scope.selectedValue = $scope.makes[0];
            }

            $scope.populateModels = function(){
                $scope.selectedValue = angular.element('.sel select option:selected').index();
                $scope.selectedMake = $scope.makes[$scope.selectedValue].models;
                angular.element('.model').show();
                angular.element('.model select').html('');
                $scope.selectedMake.forEach(function(model){

                    angular.element('.model select').append('<option value="' + model.value + '">' + model.name + '</option>')
                });
            };
        },
        template: '<div class="sel" ng-include="contentUrl"></div>'
    };
});