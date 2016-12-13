angular.module('7minWorkout').controller('WorkoutController', ['$scope', '$interval', function($scope, $interval) {

    /**
     * Model
     * Na model składa się Excercise i WoroutPlan
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
    };

    /**
     * Funkcja inicjująca
     */
    var init = function () {
        startWorkout();
    };

    var restExercise;
    var workoutPlan;

    var startWorkout = function () {
        workoutPlan = createWorkout();

        /**
         * Ustawiam odpoczynek jako jedno z ćwiczeń
         */
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Odpoczynek!",
                description: "Odpocznij trochę !",
                image: "img/rest.png"
            }),
            duration: workoutPlan.restBetweenExercise
        };

        /**
         * Zdejmuje kolejno po jednym ćwiczeniu z tablicy excercise
         */
        startExercise(workoutPlan.exercises.shift());
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
                videos: ["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"],
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
                videos: ["//www.youtube.com/embed/y-wV4Venusw", "//www.youtube.com/embed/MMV3v4ap4ro"],
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
                videos: ["//www.youtube.com/embed/Eh00_rniF8E", "//www.youtube.com/embed/ZWdBqFLNljc", "//www.youtube.com/embed/UwRLWMcOdwI", "//www.youtube.com/embed/ynPwl6qyUNM", "//www.youtube.com/embed/OicNTT2xzMI"],
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
                videos: ["//www.youtube.com/embed/Xyd_fa5zoEU", "//www.youtube.com/embed/MKmrqcoCZ-M"],
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
        $interval(function () {
                $scope.currentExerciseDuration = $scope.currentExerciseDuration + 1;
            }
            , 1000
            , $scope.currentExercise.duration);
    };

    /**
     * Odpowiada za przejscie do wybranego ćwiczenia
     * Jeśli obencnym ćwiczeniem nie jest Odpoczynek to po zakończeniuu ćw przejdzie do odpoczynku
     */
    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = workoutPlan.exercises.shift();
        }
        else {
            if (workoutPlan.exercises.length != 0) {
                nextExercise = restExercise;
            }
        }
        return nextExercise;
    };

    /**
     * Czujka sprawdzająca zmiany wartości właściwości currentExcerciseDuration
     */
    $scope.$watch('currentExerciseDuration', function (nVal) {
        if (nVal == $scope.currentExercise.duration) {
            var next = getNextExercise($scope.currentExercise);
            if (next) {
                startExercise(next);
            } else {
                console.log("Trening został zakończony!")
            }
        }
    });


    /**
     * Inicjalizacja
     */
    init();

    }]);
