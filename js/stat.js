

var input = [[],[]];                  //Array to store the regression points
var nonModifiedInput = [[],[]];       //Array to store the original Regession point
var matrix = [];                      //Matrix to do the regressions with
var tempRow = [];                     //Temporary array to store matrix values during rref
var matRow = 2;                       //Variable to specify the height of the Matrix Default: 2
var matCol = 3;                       //Variable to specify the width of the Matrix Default: 3

var originalM;                        //Variable to store original m value from data linearization
var originalB;                        //Variable to store original b balue from data linearization



//Divides a specified array (row) by a number (num)
//and outputs it into an array (output)
function rowDivide(num,row,output){
  for(var i = 0; i < matrix[row].length; i++){
    output[i] /= num;
  }
}

//Multiplies a row (row) by a number (num)
//and outputs it to an array (output)
function rowMult(num,row,output){
  for(var i = 0; i < matrix[row].length; i++){
    output[i] = num * matrix[row][i];
  }
}

//Performs a row elimination on row 1 by row 2 to solve for the 
//number in the num location
function rowEliminate(row1,row2,num){
  rowMult(num,row1,tempRow);
  for(var i = 0; i < matrix[row1].length; i++){

    matrix[row2][i] -= tempRow[i];
  }
}

//Sum all of the x^(pwr) values in the regression input
function sumOfX(pwr){
  var sum = 0;
  for (var i = 0; i < input[0].length; i++){
    sum += Math.pow(input[0][i], pwr);
  }
  return sum;
}

//Sum of all of the y^(pwr) values in the regression input
function sumOfY(pwr){
  var sum = 0;
  for (var i = 0; i < input[0].length; i++){
    sum += (Math.pow(input[0][i], pwr)) * input[1][i];
  }
  return sum;
}


//This function performs the polynomial regression of the degree (degree) 
//To learn more about the math involved in this regression, visit
//https://en.wikipedia.org/wiki/Polynomial_regression#Matrix_form_and_calculation_of_estimates
function regress(degree){
  
  //Create a new matrix with the size of the regression
  for(var i = 0; i < degree +1; i++){
    matrix[i] = new Array();
  }
  
  //Store the degree at location (0,0)
  matrix[0][0] = input[0].length;
  
  //Organize the matrix for a regression
  for(var i = 0; i < degree +1; i++){
    for(var j = 0; j < degree +1; j++){
      if(i == 0 && j == 0){
        continue;
      }
      matrix[i][j] = sumOfX(i+j);
    }
  }
  for(var i = 0; i < degree + 1; i++){
    matrix[i][degree + 1] = sumOfY(i);
  }
  
  //PUt the matrix into rref;
  rref();
}

//This function puts the matrix into rref
function rref(){
  
  //Iterate through the rows
  for(var j = 0; j < matrix[0].length-1; j++){

    //Iterate through the columns
    for(var i = 0; i < matrix.length-1; i++){

      //L saves the location that is being solved for. It is % by the matrix length
      //becuase it needs to wrap around to at the last row.
      var l = (j + i) % matrix.length;
      
      //If A matrix has a negative row, multiplly it by -1
      if(matrix[l][j] < 0){
        rowMult(-1,l,matrix[l]);
      }
      //Divide the row by the number in the location being solved for to simplify the row
      rowDivide(matrix[j][j],l,matrix[l]);
        
      //Reset the counters based on matrix length
      if(l == matrix.length - 1){
        var k = 0;
      }
      else{
        var k = l + 1;
      }
      
      //Perform the elimination function on the rows
      rowEliminate(j,k,matrix[k][j]);
    }
  }
}



/*

  Solve equations takes in the number of equation 1, the number of equation 2,
  the latex of equation 1, the latex of equation 2, and the xScale
  It outputs the points of intersection of the two equations.

  To calculate the interesection of graphs, we first look at the differences of 
  the previous column of points, and the current column of points. If the differences
  change signs, there is an intersection.
  
  For the graph:
  
  5       _____  _________/
  4      /     \/
  3            /\
  2        ___/  \
  1      /        \_________
  0     /                   \
    1 2 3 4 5 6 7 8 9 10 11 12
    
  If we look at the differences of the equations at x = 6, it is 2. At x = 8, 
  the difference is -3. Because there is a sign change, we know there is an 
  intersection.
  
  By doing this check in very small increments, we are able to approximate the solutions
  of two equations. 
*/
function solveEquations(eq1, eq2, latexEQ1, latexEQ2, xScale){
  
  var previousRead = 0;
  var currentRead = 0; 
  var intersectCounter = 0;
  
  //Array that holds all of the solutions for the equations
  var answers = [];
  
  //Iterate through all of the points
  for (var i = 1; i < outputBuffer[0][0].length; i++){
    
    //Store the difference between the previous set of points, and the current set of points
    previousRead = outputBuffer[eq1][1][i-1] - outputBuffer[eq2][1][i-1];
    currentRead = outputBuffer[eq1][1][i] - outputBuffer[eq2][1][i];
    
    //Compare if any differences switched signs
    if(currentRead > 0 && previousRead <= 0 || currentRead < 0 && previousRead >= 0){
      intersectCounter ++;
      previousRead = outputBuffer[eq1][1][i-2] - outputBuffer[eq2][1][i-2];
      currentRead = outputBuffer[eq1][1][i+2] - outputBuffer[eq2][1][i+2];
      
      //Calculate the real x coordinate
      var x = ((i - 2 + (4* previousRead / currentRead)) * xScale) - domain/2;
      var y;
      
      //Check which equation has a variable, and then use that equation to calculate the y value. 
      if (latexEQ1.indexOf("x") !== -1) {
        y = calculate(latexEQ1, x.toFixed(5));
      } else {
        y = calculate(latexEQ2, x.toFixed(5));
      }
      
      //Store the ordered pair solution into the answers array. 
      answers.push([x, y]);
    }
  }
  
  //return the answer array
  return answers;
}

//This functions plot the user inputted points on the graph
function plotPoints(){
  
  //Iterate through the original point array
  for(var i = 0; i < nonModifiedInput[0].length; i++){
    
      //Calculate the canvas x and y coordinates and plot on the graph
      xCoord1 = (nonModifiedInput[0][i] * (1200 / (dLength))) + xOffset;
      yCoord1 = (nonModifiedInput[1][i] * (-900/(range))) + yOffset;
      ctx.fillRect((xCoord1-4), (yCoord1-7), 8, 14);
      ctx.stroke();
  }
}

//Run graph once so we see the gridlines when we first enter the site.
graph(2000);

//This converts the results from the regression matrix into a polynomial expression 
//that can be graphed with our calculator. 
function RInputCalculator(){
  var s = "";
  for(var i = matrix.length; i > 0; i--){
    
    //Converts it in the form ax^n + bx^n-1 + cx^n-2... where n is the degree of the polynomial
    s += "(" + matrix[i - 1][matrix[0].length - 1].toFixed(7) +  "*(x^" + (i - 1) + "))";
    if(i > 1){
      s += "+";
    }
  }
  return s;
}

//This convertes the variables in the matrix into a power function.
function pwrInputCalculator(){
  //a * x^b
  return matrix[0][2].toFixed(5) + "*x^(" + matrix[1][2].toFixed(5) + ")";
  
}

//This converts the variables in the matrix to a exponential function
function expInputCalculator(){
  //a * b^x
  return matrix[0][2].toFixed(5) + "*" + matrix[1][2].toFixed(5) + "^x";
  
}

//This converts the variables in the matrix to a log function
function logInputCalculator(){
  //a + log_(b)_(x)
  return matrix[0][2].toFixed(5) + "+(log(x))/(log("+matrix[1][2].toFixed(5) + "))";
  
}

//Converts the original input to a linear function
function originalInputCalculator(){
  
  return originalM.toFixed(5) + "*x+" +originalB.toFixed(5);
  
}

//Finds the mean of all of the x values in the regression input
function xMean(){
  var xSum = 0;
  for(var i = 0; i < nonModifiedInput[0].length; i++){
    xSum += nonModifiedInput[0][i];
  }
  return (xSum / nonModifiedInput[0].length).toFixed(3);
}


//Finds the mean of all of the xy values in the regression input
function xyMean(){
  var xySum = 0;
  for(var i = 0; i < nonModifiedInput[0].length; i++){
    xySum += nonModifiedInput[1][i] * input[0][i];
  }
  return (xySum / nonModifiedInput[0].length).toFixed(3);

}

//Finds the mean of all of the x^2 values in the regression input
function xSMean(){

  var xsSum = 0;
  for(var i = 0; i < nonModifiedInput[0].length; i++){
    xsSum += nonModifiedInput[0][i] * nonModifiedInput[0][i];
  }
  return (xsSum / nonModifiedInput[0].length).toFixed(3);

}

//This takes the ln of an array 
function lnArray(array){
  for(var i = 0; i < array.length; i++){
    array[i] = Math.log(array[i]);
  }
}

//This Converts the matrix values into a and b values for a power equation
function pwrRegress(){
  lnArray(input[0]);
  lnArray(input[1]);
  regress(1);
  originalM = matrix[1][2];
  originalB = matrix[0][2];
  matrix[0][2] = Math.pow(Math.E,matrix[0][2]);
  
}

//This converts the matrix values into a and b values for an exponential equation
function expRegress(){
  lnArray(input[1]);
  regress(1);
  originalM = matrix[1][2];
  originalB = matrix[0][2];
  matrix[0][2] = Math.pow(Math.E,matrix[0][2]);
  matrix[1][2] = Math.pow(Math.E,matrix[1][2]);

}

//This converts the matrix values into a and b for a logarithmic equation.
function logRegress(){
  var inputStorage = 0;
  
  lnArray(input[0]);
  for(var i = 0; i <input[0].length;i++){
    inputStorage = input[0][i];
    input[0][i] = input[1][i];
    input[1][i] = inputStorage;
  }
  regress(1);
  originalB = matrix[0][2];
  originalM = matrix[1][2];
  matrix[0][2] = Math.pow(Math.E,matrix[0][2]);
  matrix[1][2] = Math.pow(Math.E,matrix[1][2]);
  
  matrix[0][2] = -1 * (Math.log(matrix[0][2])/Math.log(matrix[1][2]));

}