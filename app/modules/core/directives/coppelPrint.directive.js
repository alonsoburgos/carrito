(function() {
    'use strict';

/**
 * @ngdoc directive
 * @name core.directive:coppelPrint
 * @element button
 * @function
 *
 * @description
 * Imprime aquellos elementos DOM que contengan el attr printable de la página actual.
 *
 * @example
    <div print-section>
        <table> </table>
       <div not-printable style="margin-top:50px">
            <button class="btn btn-primary" coppel-print><i class="fa fa-print"></i> Print</button>
       </div>
    </div>
 */

    angular.module('core').directive('coppelPrint', [
        '$window',
        function($window) {
            var printSection = angular.element('[print-section]');

            if (!printSection.length) {
                printSection = angular.element('body').attr('print-section', true);
            }

            return {
                
                link: function postLink(_scope, _element, _attrs) {
                    _element.on('click', function() {
                        $window.print();
                    });
                },
                restrict: 'A'
            };
        }
    ]);
})();
