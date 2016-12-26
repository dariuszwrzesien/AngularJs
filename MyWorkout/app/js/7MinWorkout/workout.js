angular.module('7minWorkout').controller('WorkoutController',
    ['$scope', '$interval', '$location', 'workoutHistoryTracker',
        function($scope, $interval, $location, workoutHistoryTracker) {

    /**
     * Model
     * Na model składa się Excercise i WorkoutPlan
     */
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
        this.totalWorkoutDuration = function () {
            if (this.exercises.length == 0) return 0;
            var total = 0;
            angular.forEach(this.exercises, function (exercise) {
                total = total + exercise.duration;
            });
            return this.restBetweenExercise * (this.exercises.length - 1) + total;
        }
    };

    /**
     * Funkcja inicjująca
     */
    var init = function () {
        startWorkout();
    };

    var restExercise;
    var exerciseIntervalPromise;
    var startWorkout = function () {
        $scope.workoutPlan = createWorkout();
        $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
        /**
         * Ustawiam odpoczynek jako jedno z ćwiczeń
         */
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Odpoczynek!",
                description: "Odpocznij trochę!",
                image: "img/rest.png",
            }),
            duration: $scope.workoutPlan.restBetweenExercise
        };

        workoutHistoryTracker.startTracking();
        $scope.currentExerciseIndex = 0;
        startExercise($scope.workoutPlan.exercises[0]);
    };

    var createWorkout = function () {

        /**
         * Tworze nowy worout a następnie do właściwości (tablicy)
         * workout.exercises dodaje ćwiczenia w oparciu o model Excercise
         *
         */
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "7 Minute Workout",
            restBetweenExercise: 10
        });

        /**
         * Pierwsze ćwiczenie - Pajacyki
         */
        workout.exercises.push({
            details: new Exercise({
                name: "jumpingJacks",
                title: "Pajacyki",
                description: "Pajacyki to proste ćwiczenie fizyczne polegające na podskakiwaniu i wymachiwaniu rękoma.",
                image: "img/JumpingJacks.png",
                nameSound: "content/jumpingjacks.wav",
                videos: ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"],
                procedure: "Stań w pozycji wyprostowanej, złącz stopy, a ramiona opuść swobodnie wzdłuż tułowia. \
                              Zegnij lekko kolana, a następnie wyskocz kilkanaście centymetrów w górę. \
                              W wyskoku rozłącz nogi, mniej więcej na szerokość ramion lub nieco szerzej, i jednocześnie wykonaj lekko zgiętymi w łokciach rękoma wymach nad głową. \
                              Po wylądowaniu na podłodze stopy są rozstawione na szerokość ramion, a lekko zgięte, uniesione nad głowę ręce stykają się dłońmi. "
            }),
            duration: 30
        });

        /**
         * Drugie ćwiczenie - Krzesełko
         */
        workout.exercises.push({
            details: new Exercise({
                name: "wallSit",
                title: "Krzesełko",
                description: "Krzesełko to popularne ćwiczenie wzmacniające mięsień czworogłowy uda.",
                image: "img/wallsit.png",
                nameSound: "content/wallsit.wav",
                videos: ["y-wV4Venusw", "MMV3v4ap4ro"],
                procedure: "Stań przy ścianie, opierając się o nią plecami. \
                              Stopy rozstaw na szerokość ramion i nieco odsuń od ściany. \
                              Następnie, wciąż opierając się o ścianę, zsuwaj tułów w dół aż do momentu, gdy nogi zgięte w kolanach utworzą kąt prosty. \
                              Wytrzymaj chwilę w tej pozycji."
            }),
            duration: 30
        });

        /**
         * Kolejne ćwiczenie
         */
        workout.exercises.push({
            details: new Exercise({
                name: "pushUp",
                title: "Pompki",
                description: "Pompki to popularne ćwiczenie wykonywane w pozycji leżącej na brzuchu, polegające na podnoszeniu i opuszczaniu ciała na rękach.",
                image: "img/Pushup.png",
                nameSound: "content/pushups.wav",
                videos: ["Eh00_rniF8E", "ZWdBqFLNljc", "UwRLWMcOdwI", "ynPwl6qyUNM", "OicNTT2xzMI"],
                procedure: "Połóż się na brzuchu, zegnij ręce w łokciach, a dłonie rozstawione na szerokość ramion lub nieco szerzej oprzyj na podłodze. \
                              Utrzymując ciało w jednej linii, podnieś się na rękach, aż do ich całkowitego wyprostowania. \
                              Wciąż zachowując linię prostą ciała, opuść się ku ziemi, zginając ręce w łokciach."
            }),
            duration: 30
        });

        /**
         * Kolejne ćwiczenie
         */
        workout.exercises.push({
            details: new Exercise({
                name: "crunches",
                title: "Napinanie brzucha",
                description: "Proste napinanie mięśni brzucha jest podstawowym ćwiczeniem programu wzmacniającego.",
                image: "img/crunches.png",
                nameSound: "content/crunches.wav",
                videos: ["Xyd_fa5zoEU", "MKmrqcoCZ-M"],
                procedure: "Połóż się na plecach, zegnij nogi w kolanach i postaw stopy rozsunięte na szerokość bioder na podłodze. \
                              Oprzyj dłonie z tyłu głowy tak, by kciuki znalazły się za uszami. \
                              Łokcie rozchyl na boki i lekko unieś. \
                              Delikatnie napnij mięśnie brzucha i unieś, odrywając od podłogi, tylko głowę, szyję oraz ramiona. \
                              Utrzymaj przez chwilę taką pozycję, a następnie z powrotem opuść górną część ciała na podłogę."
            }),
            duration: 30
        });

        /**
         * Zwracam workout
         */
        return workout;
    };

    /**
     * startExcercise jest wykonywane w startWorkout
     * i przekazywane jest do niego ćwiczenie
     *
     * startexcercise ustawia wartości dla widoku?
     */
    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        exerciseIntervalPromise = startExerciseTimeTracking();
    };

    var startExerciseTimeTracking = function () {
        var promise = $interval(function () {
            ++$scope.currentExerciseDuration;
            --$scope.workoutTimeRemaining;
        }, 1000, $scope.currentExercise.duration - $scope.currentExerciseDuration);
        promise.then(function () {
            var next = getNextExercise($scope.currentExercise);
            if (next) {
                startExercise(next);
            }
            else {
                workoutComplete();
            }
        }, function (error) {
            console.log('Obietnica $interval anulowana. Powód: -' + error);
        });
        return promise;
    }

    /**
     * Zakończenie treningu:
     * 1. zakończ trakowanie
     * 2. przejdz do strony finish
     */
    var workoutComplete = function () {
        workoutHistoryTracker.endTracking(true);
        $location.path('/finish');
    }

    /**
     * Sterowanie przebiegiem aplikacji: Pause, resume oraz przełącznik pause/resume
     */
    $scope.pauseWorkout = function () {
        $interval.cancel(exerciseIntervalPromise);
        $scope.workoutPaused = true;
    };
    $scope.resumeWorkout = function () {
        exerciseIntervalPromise = startExerciseTimeTracking();
        $scope.workoutPaused = false;
    };
    $scope.pauseResumeToggle = function () {
        if ($scope.workoutPaused) {
            $scope.resumeWorkout();
        }
        else {
            $scope.pauseWorkout();
        }
    }

    /**
     * Pauza wywołana z klawiatury.
     * Naciśnięcie klasiwsz P (litery 'p lub' 'P')
     * powoduje przełączenie się stanu aplikacji
     *
     * @param event
     */
    $scope.onKeyPressed = function (event) {
        if (event.which == 80 || event.which == 112) {
            $scope.pauseResumeToggle();
        }
    };

    /**
     * Odpowiada za przejscie do wybranego ćwiczenia
     * Jeśli obencnym ćwiczeniem nie jest Odpoczynek to po zakończeniu ćw przejdzie do odpoczynku
     */
    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = $scope.workoutPlan.exercises[$scope.currentExerciseIndex + 1];
            /**
             * Inkrementuje index $scope.currentExerciseIndex
             */
            ++$scope.currentExerciseIndex;
        }
        else {
            if ($scope.currentExerciseIndex < $scope.workoutPlan.exercises.length - 1) {
                nextExercise = restExercise;
            }
        }

        return nextExercise;
    };

    /**
     * scope.$watch
     * Czujka sprawdzająca zmiany wartości właściwości currentExcerciseDuration
     */
    // $scope.$watch('currentExerciseDuration', function (nVal) {
    //     if (nVal == $scope.currentExercise.duration) {
    //         var next = getNextExercise($scope.currentExercise);
    //         if (next) {
    //             startExercise(next);
    //         } else {
    //             console.log("Trening został zakończony!")
    //         }
    //     }
    // });

    /**
     * Inicjalizacja
     */
    init();

    }]);

/**
 * Kontroler dzwięku
 */
angular.module('7minWorkout').controller('WorkoutAudioController',
    ['$scope', '$timeout',
        function ($scope, $timeout) {
            $scope.exercisesAudio = [];
            var workoutPlanwatch = $scope.$watch('workoutPlan',
                function (newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                    if (newValue) { // newValue==workoutPlan
                        angular.forEach($scope.workoutPlan.exercises,
                            function (exercise) {
                                $scope.exercisesAudio.push({
                                    src: exercise.details.nameSound,
                                    type: "audio/wav"
                                });
                            });
                        workoutPlanwatch(); // przerywamy obserwację zmian właściwości
                    }
                });
            $scope.$watch('currentExercise', function (newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
                if (newValue && newValue != oldValue) {
                    if ($scope.currentExercise.details.name == 'rest') {
                        $timeout(function () {
                            $scope.nextUpAudio.play();
                        }, 2000);
                        $timeout(function () {
                            $scope.nextUpExerciseAudio.play($scope.currentExerciseIndex + 1, true);
                        }, 3000);
                    }
                }
            });
            $scope.$watch('currentExerciseDuration', function (newValue, oldValue) {
                if (newValue) {
                    if (newValue == $scope.currentExercise.duration / 2 && $scope.currentExercise.details.name != 'rest') {
                        $scope.halfWayAudio.play();
                    } else if (newValue == $scope.currentExercise.duration - 3) {
                        $scope.aboutToCompleteAudio.play();
                    }
                }
            });
            /**
             * Czujka sprawdza stan workoutPaused
             */
            $scope.$watch('workoutPaused', function (newValue, oldValue) {
                if (newValue) {
                    $scope.ticksAudio.pause();
                    $scope.nextUpAudio.pause();
                    $scope.nextUpExerciseAudio.pause();
                    $scope.halfWayAudio.pause();
                    $scope.aboutToCompleteAudio.pause();
                }
                else {
                    $scope.ticksAudio.play();
                    if ($scope.halfWayAudio.currentTime > 0 &&
                        $scope.halfWayAudio.currentTime < $scope.halfWayAudio.duration)
                        $scope.halfWayAudio.play();
                    if ($scope.aboutToCompleteAudio.currentTime > 0 &&
                        $scope.aboutToCompleteAudio.currentTime <
                        $scope.aboutToCompleteAudio.duration)
                        $scope.aboutToCompleteAudio.play();
                }
            });
            var init = function () {
            }
        init();
    }]);
