angular.module('messageApp', ['ui.bootstrap'])
  .controller('mainController', function($scope, $http) {

    $scope.poolInput = "";
    $scope.sendInput = "";
    $scope.scheduleInput = "";
    $scope.messages = null;
    $scope.schedule = null;
    $scope.groupme = null;
    $scope.popup = false;
    $scope.date = new Date();


    /** Date and Time **/
    $scope.openPopup = function() {
      $scope.popup = true;
    };

    $scope.today = function() {
      $scope.datet = new Date();
    };
    //$scope.today();



    /** API Interface **/


    /* GroupMe Conversation */

    // $scope.getGroupme = function() {
    //   $http.get('api/groupme')
    //     .success(function(data) {
    //       $scope.groupme = data;
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };
    // $scope.getGroupme();
    //
    // $scope.sendGroupme = function(text) {
    //   //send message
    //   $http.post('/api/groupme', text)
    //     .success(function(data) {
    //       $scope.sendInput = '';
    //       $scope.groupme = data;
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };


    /* Scheduled Messages */

    $scope.getSchedule = function() {
      $http.get('api/schedule')
        .success(function(data) {
          $scope.schedule = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getSchedule();

    $scope.createSchedule = function() {
      item = {};

      item['message']= $scope.scheduleInput;
      item['when'] = $scope.date;

      $http.post('/api/schedule', item)
        .success(function(data) {
          $scope.sendInput = '';
          $scope.schedule = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.deleteSchedule = function(id) {
      $http.delete('/api/schedule/' + id)
        .success(function(data) {
          $scope.schedule = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    /* Message Pool */

    // when landing on the page, get all messages and show them
    $scope.getMessages = function() {
      $http.get('/api/messages')
        .success(function(data) {
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function() {
      item = {};
      item['text'] = $scope.poolInput;
      $http.post('/api/messages', item)
        .success(function(data) {
          $scope.poolInput = ""; // clear the form so our user is ready to enter another
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // delete a message after checking it
    $scope.deleteMessage = function(id) {
      $http.delete('/api/messages/' + id)
        .success(function(data) {
          $scope.messages = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  });
