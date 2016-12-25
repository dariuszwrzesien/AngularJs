angular.module('app', ['ngRoute', 'ngSanitize', '7minWorkout', 'mediaPlayer', 'ui.bootstrap', 'ngAnimate']).
    config(function ($routeProvider, $sceDelegateProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'partials/start.html' });
        $routeProvider.when('/workout', {
            templateUrl: 'partials/workout.html',
            controller: 'WorkoutController' });
        $routeProvider.when('/finish', {
            templateUrl: 'partials/finish.html' });
        $routeProvider.otherwise({
            redirectTo: '/start'
        });
    $sceDelegateProvider.resourceUrlWhitelist([
        // zezwalamy na zasoby z tego samego źródła
        'self',
        // zezwalamy na zasoby z youtube
        'http://*.youtube.com/**',
        'https://*.ytimg.com/**']);
});
angular.module('7minWorkout', []);