myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', '$location', '$routeParams', 'FIREBASE_URL', function ($scope, $rootScope, $firebaseObject, $firebaseArray, $location, $routeParams, FIREBASE_URL) {

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var fbRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

    var checkinsList = $firebaseArray(fbRef);
    $scope.checkins = checkinsList;

    $scope.order = "firstname";
    $scope.direction = null;
    $scope.query = '';
    $scope.recordId = '';

    $scope.addCheckin = function() {

        var checkinsInfo = $firebaseArray(fbRef);

        var myData = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsInfo.$add(myData).then(function() {
            $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
        });

    };

    $scope.deleteCheckin = function(id) {

        var refDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + id);

        var record = $firebaseObject(refDel);
        record.$remove(id);

    };

    $scope.pickRandom = function() {

        var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
        $scope.recordId = checkinsList.$keyAt(whichRecord);

    };

    $scope.showLove = function(myCheckin) {

        myCheckin.show = !myCheckin.show;

        if (myCheckin.userState == 'expanded') {
            myCheckin.userState = '';
        } else {
            myCheckin.userState = 'expanded';
        }

    };

    $scope.giveLove = function(myCheckin, myGift) {

        var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + myCheckin.$id + '/awards');

        var checkinsArray = $firebaseArray(refLove);

        var myData = {
            name: myGift,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsArray.$add(myData);

    };

    $scope.deleteLove = function(checkinId, award) {

        var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + checkinId + '/awards/' + award);

        var record = $firebaseObject(refLove);
        record.$remove(award);


    };

}]);