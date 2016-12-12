angular.module('7minWorkout').controller('WorkoutController', ['$scope', function($scope) {
    function Exercise(args) {
        this.name = args.name;
        this.title = args.title;
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure = args.procedure;
    };

    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
    };

    var restExercise;
    var workoutPlan;

    var startWorkout = function () {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Odpoczynek!",
                description: "Odpocznij trochę !",
                image: "img/rest.png"
            }),
            duration: workoutPlan.restBetweenExercise
        };
        startExercise(workoutPlan.exercises.shift());
    };

    var createWorkout = function () {
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "7 Minute Workout",
            restBetweenExercise: 10
        });

        workout.exercises.push({
            details: new Exercise({
                name: "jumpingJacks",
                title: "Pajacyki",
                description: "Pajacyki.",
                image: "img/JumpingJacks.png",
                videos: [],
                procedure: ""
            }),
            duration: 30
        });
        return workout;
    };

    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        $interval(function () {
                $scope.currentExerciseDuration = $scope.currentExerciseDuration + 1;
            }
            , 1000
            , $scope.currentExercise.duration);
    };

    var init = function () {
        startWorkout();
    };

    init();

    }]);
