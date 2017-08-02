// Mode variable that stores what screen the user is on
var mode = null;

// Number of rows that the matrix has, which updates automatically
var matrixRows = 9;

// Only graph after the timeout has expired, to avoid multiple unnecessary calculations
var typeHasTimedOut = false;
var typeTimeout;

$(document).ready(function() {
  resetError();
});

// For each of the mode buttons, display the mode screen
$("#solve-button").click(function() {
  mode = "solve";
  outputBuffer = [];
  $("#graph-window").css("display", "none");
  $("#matrixpop").css("display", "none");
  $("#stat").css("display", "none");
  $("#solve").css("display", "block");
  $("#welcome").css("display", "none");
});

$("#graph-button").click(function() {
  regressing = false;
  mode = "graph";
  outputBuffer = [];
  $("#graph-window").css("display", "block");
  $("#matrixpop").css("display", "none");
  $("#stat").css("display", "none");
  $("#solve").css("display", "none");
  $("#welcome").css("display", "none");
});

$("#matrix-button").click(function() {
  regressing = false;
  mode = "matrix";
  $("#graph-window").css("display", "none");
  $("#matrixpop").css("display", "block");
  $("#stat").css("display", "none");
  $("#solve").css("display", "none");
  $("#welcome").css("display", "none");
});

$("#statistic-button").click(function() {
  mode = "statistic";
  input = [];
  $("#graph-window").css("display", "none");
  $("#matrixpop").css("display", "none");
  $("#stat").css("display", "block");
  $("#solve").css("display", "none");
  $("#welcome").css("display", "none");
});

// Control buttons
$("#inp").keyup(function() { calculator(); });
$("#plus-button").click(function() { zoomIn(); });
$("#home-button").click(function() { home(); });
$("#minus-button").click(function() { zoomOut(); });

// Statistics buttons to add cooridnates
$("#statistic-add-coordinate").click(function() {
  if ($("#statistic-input-x").val() == "") {
    throwError("Invalid x value!");
    return;
  } else if ($("#statistic-input-y").val() == "") {
    throwError("Invalid y value!");
    return;
  } else {
    resetError();
  }
  $("#coord-input").html($("#coord-input").html() + '<div class="statistic-coordinate">(' + $("#statistic-input-x").val() + ", " + $("#statistic-input-y").val() + ')</div>');
  $("#statistic-input-x").val("");
  $("#statistic-input-y").val("");
});

// MathQuill configuration
var mathFieldSpan = document.getElementById('inp');
var mathField = MQ.MathField(mathFieldSpan, {
  spaceBehavesLikeTab: true,
  handlers: {
    edit: function() {
      calculator();
    }
  }
});

var solveFieldSpanOne = document.getElementById('solve-inp-1');
var solveFieldOne = MQ.MathField(solveFieldSpanOne, {
  spaceBehavesLikeTab: true
});

var solveFieldSpanTwo = document.getElementById('solve-inp-2');
var solveFieldTwo = MQ.MathField(solveFieldSpanTwo, {
  spaceBehavesLikeTab: true
});

$("#solve-go").click(function() {
  $("#solve-answer").html("Loading...");
  home();
  calculator();
});

// Call functions in index.js to interact with the user interface
function calculator() {
  typeHasTimedOut = false;
  if (!typeHasTimedOut) {
    clearInterval(typeTimeout);
    typeTimeout = setTimeout(function() {
      typeHasTimedOut = true;
      if (mode == "solve") {
        if (solveFieldOne.latex() == "" || solveFieldTwo.latex() == "") {
          $("#solve-answer").html("");
          return;
        }
        points(range, domainMin, domainMax, 0.0001, outputBuffer, parsed(solveFieldOne.latex()), 0);
        points(range, domainMin, domainMax, 0.0001, outputBuffer, parsed(solveFieldTwo.latex()), 1);
        $("#solve-answer").html("");
        var answer = solveEquations(0, 1, parsed(solveFieldOne.latex()), parsed(solveFieldTwo.latex()), 0.0001);
        for (var ans = 0; ans < answer.length; ans ++) {
          $("#solve-answer").html($("#solve-answer").html() + "(" + parseFloat(answer[ans][0]).toFixed(2) + ", " + parseFloat(answer[ans][1]).toFixed(2) + ")");
          if (ans !== answer.length - 1) {
            $("#solve-answer").html($("#solve-answer").html() + ", ");
          }
        }
      } else if (mode == "graph") {
        input = mathField.latex();
        if(regressing == true){
          input = regressionAnswer;
        }
        
        if (xScale === 0) return;
        
        var numberOfSteps = points(range,domainMin, domainMax, xScale, outputBuffer, input, 0);
        if(numberOfSteps == "toLarge"){
          throwError("y value is not in range!");
        }
        else{
          graph(numberOfSteps);
          
          if(regressing == true){
            console.log("sdfa");
            plotPoints();
          }
        }
      } else if (mode == "matrix") {
    
      } else if (mode == "statistic") {
    
      }
    }, 250);
  }
}

// Change the amount of matrix rows in realtime
$("#matrixrows").keyup(function() {
  if (parseInt($("#matrixrows").val()) <= 9) {
    matrixRows = parseInt($("#matrixrows").val());
    $("#matrixcolumns").html(matrixRows + 1);
  } else if ($("#matrixrows").val() == "") {
    $("#matrixcolumns").html("&#8734;");
    matrixRows = null;
  } else {
    $("#matrixrows").val(9);
    matrixRows = 9;
    $("#matrixcolumns").html(matrixRows + 1);
  }
  
  for (var row = 1; row <= 9; row ++) {
    for (var x = 1; x <= 10; x ++) {
      $("#inputrow" + row + " td:nth-child(" + x + ")").css("display", "table-cell");
      $("#outputrow" + row + " td:nth-child(" + x + ")").css("display", "table-cell");
    }
    $("#inputrow" + row).css("display", "table-row");
    $("#outputrow" + row).css("display", "table-row");
  }
  
  changeMatrixRows(matrixRows);
});

function changeMatrixRows(rows) {
  if (rows == null) return;
  
  for (var row = 1; row <= 9; row ++) {
    for (var box = rows + 2; box <= 10; box ++) {
      $("#inputrow" + row + " td:nth-child(" + box + ")").css("display", "none");
      $("#outputrow" + row + " td:nth-child(" + box + ")").css("display", "none");
    }
    for (var box = rows + 1; box <= 9; box ++) {
      $("#inputrow" + box).css("display", "none");
      $("#outputrow" + box).css("display", "none");
    }
  }
}

function addToMatrixVariable(rows) {
  matrix = [];
  if (rows == null) return;
  
  for (var row = 1; row <= rows; row ++) {
    matrix.push([]);
    for (var value = 1; value <= rows + 1; value ++) {
      matrix[row - 1].push(parseFloat($("#inputrow" + row + " td:nth-child(" + value + ") input").val()));
    }
  }
  rref();
  
  for (var row = 1; row <= rows; row ++) {
    for (var value = 1; value <= rows + 1; value ++) {
      if (isNaN(parseFloat(matrix[row - 1][value - 1]))) {
        $("#outputrow" + row + " td:nth-child(" + value + ")").html("&#8734;");
      } else {
        $("#outputrow" + row + " td:nth-child(" + value + ")").html(matrix[row - 1][value - 1]);
      }
    }
  }
}

$("#tableformatrixinput").keyup(function() {
  addToMatrixVariable(matrixRows);
});

// Regressions UI interaction
var regressionAnswer;

$("#regress-button").click(function() {
  regressing = true;
  if ($("#regress-selector").val() == 'select') {
    throwError("Choose a method of regression!");
    return;
  } else if ($("#regress-selector").val() == 'polynomial' && $("#polynomial-degree").val() == "") {
    throwError("Please fill in an exponent!");
    return;
  }
  input[0] = [];
  input[1] = [];
  
  var regressCounter = 0;
  $('#coord-input').children('div').each(function () {
    input[0].push($(this).html().substring($(this).html().lastIndexOf("(") + 1, $(this).html().lastIndexOf(",")));
    input[1].push($(this).html().substring($(this).html().lastIndexOf(" ") + 1, $(this).html().lastIndexOf(")")));
    regressCounter ++;
  });
  nonModifiedInput = [[],[]];
  for(var i = 0; i < 2; i++){
  
    for(var j = 0; j < input[0].length; j++){
    
      nonModifiedInput[i][j] = input[i][j];
    }
  
  }
  
  if ($("#regress-selector").val() == 'polynomial' && regressCounter < parseInt($("#polynomial-degree").val())) {
    throwError("For an n<sup>th</sup> degree polynomial regression, you need at least n inputs!");
    return;
  } else if ($("#regress-selector").val() == 'polynomial' && parseInt($("#polynomial-degree").val()) == 2 && regressCounter < 3){
    throwError("Three coordinates are required for a second degree polynomial regression!");
    return;
  } else if (regressCounter < 2) {
    throwError("You must have more than one coordinate!");
    return;
  }
  
  if ($("#regress-selector").val() == 'polynomial') {
    regress(parseInt($("#polynomial-degree").val()));
    $("#regression-answer").html(RInputCalculator());
    regressionAnswer = RInputCalculator();
    $("#rsquared").html(rSquared(regressionAnswer));
  } else if ($("#regress-selector").val() == 'exponential') {
    for (var reg = 0; reg < input[1].length; reg ++) {
      if (input[1][reg] <= 0) {
        throwError("For exponential functions, all y values must be positive!");
        return;
      }
    }
    expRegress();
    $("#regression-answer").html(expInputCalculator());
    regressionAnswer = expInputCalculator();
    $("#rsquared").html(rSquared(originalInputCalculator()));
  } else if ($("#regress-selector").val() == 'logarithmic') {
    for (var reg = 0; reg < input[0].length; reg ++) {
      if (input[0][reg] <= 0) {
        throwError("For logarithmic functions, all x values must be positive!");
        return;
      }
    }
    logRegress();
    $("#regression-answer").html(logInputCalculator());
    regressionAnswer = logInputCalculator();
    $("#rsquared").html(rSquared(originalInputCalculator()));
  } else if ($("#regress-selector").val() == 'power') {
    for (var reg = 0; reg < input[0].length; reg ++) {
      if (input[0][reg] <= 0 || input[1][reg] <= 0) {
        throwError("For power functions, all x and y values must be positive!");
        return;
      }
    }
    pwrRegress();
    $("#regression-answer").html(pwrInputCalculator());
    regressionAnswer = pwrInputCalculator();
    $("#rsquared").html(rSquared(originalInputCalculator()));
  }
  
  $("#regress-answer-container").css("display", "block");
  var problemSpan = document.getElementById('regression-answer');
  MQ.StaticMath(problemSpan);
});

$("#regress-selector").on('change', function() {
    if ($(this).val() == "polynomial") {
      $("#polynomial-degree").css("visibility", "visible");
    } else {
      $("#polynomial-degree").css("visibility", "hidden");
    }
});

$("#regress-graph-button").click(function() {
  // points(range,domainMin, domainMax, xScale, outputBuffer, regressionAnswer, 0);
  
  // graph(2000);
  calculator();
  
  plotPoints();
  mode = "graph";
  $("#graph-window").css("display", "block");
  $("#stat").css("display", "none");
});

//yMean calculates the mean of the y values in the regression input
function yMean(){
  var ySum = 0;
  for(var i = 0; i < input[0].length; i++){
    ySum += parseFloat(input[1][i]);
  }
  return (ySum / input[0].length).toFixed(3);
}

//rSquared calculates the coefficient of determination through 1 - SSR/SSTO
function rSquared(equation){
  
  var ymean = yMean();
  var r2 = 1 - (SSR(equation) / SSTO(ymean));
  r2 = r2.toFixed(5);

  return r2;
}

//SSTO calculates the squared sum of all of the y values - mean
function SSTO(yMean){
  var yDifference = 0;
  var squaredSum = 0;
  for(var i = 0; i < input[0].length; i++){
    yDifference = input[1][i] - yMean;
    squaredSum += yDifference * yDifference;
  }
  return squaredSum.toFixed(3);
}

//SSR calculates the distance from the line of best fit to the points
function SSR(lineOfBestFit){
  var yDifference = 0;
  var sum = 0;
  for(var i = 0; i < input[0].length; i++){
    var lineError = calculate(lineOfBestFit, input[0][i].toString());
    yDifference = input[1][i] - lineError;
    sum += parseFloat((yDifference * yDifference).toFixed(3));
  }
  return sum;
}