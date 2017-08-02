var printedParse = false;
var PRINT_FLAG = true;
var regressing = false;
// Global flags used for debugging

var MQ = MathQuill.getInterface(2);
//Mathquill Initialization

// Variables used in computing specific points for graphs
var input = ""; 
var range = 10;     
var domain = 20;
var xScale = 0.01;    
var domainMin = -10;  
var domainMax = 10; 
var rangeMax =  yOffset/ 90;
var rangeMin = rangeMax - range;
var domainStep = (domainMax - domainMin) / 20;
var rangeStep = range / 10;
var domainMiddle = (domainMax + domainMin) / -2;
var yOffset = 450;
var dLength = domainMax - domainMin;
var xOffset = 600;
var yIncrement = range/10;
var xIncrement = dLength / domain;

//Variables used for graph movement
var accuracy = 3;
var zoomCounter = 0;
var mousePos = null;
var originalX;
var originalY;
var tempYOffSet;
var tempXOffSet;
var originalInput;


// Arrays used to store calculated points in a graph
var outputSegment = [[],[]];
var outputBuffer = [];

//Flag variables used to indicate whether each special
//function should be preformed on the selected input
var log = false;
var sin = false;
var cos = false;
var tan = false;
var arctan = false;
var arccos = false;
var arcsin = false;

//Variables used for graphing the calculated points
var xCoord1;
var yCoord1;
var xCoord2;
var yCoord2;

//Helper functions used for string manipulation
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(val){
        var i = this.length;
        while (i--) {
            if (this[i] == val) return i;
        }
        return -1;
    } 
}

function IsNumeric( obj ) {
    return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
}

//Functions that output the error message at the bottom of the screen
var errorHasBeenThrown = false;
function throwError(errorMessage) {
  if (errorHasBeenThrown) return;
  $("#error-message").html(errorMessage);
  $("#exclamation").html("!");
  $("#exclamation").css("background-color", "red");
}

function resetError() {
  $("#exclamation").css("background-color", "#23e323");
  $("#exclamation").html("&#10003;");
  $("#error-message").html("No syntax errors! :)");
}

// Points determines what points in the specified domain need to be calculated, and calculates 
// each point with the calculate() function. It moves in increments specified by the xScale variable.
function points(range ,domainMin, domainMax, xScale, outputBuffer,input,equation) {
  resetError();
  printedParse = false;
  var large = 0;
  // Set up a new array to load the calculated points into
  outputBuffer[equation] = new Array(new Array(), new Array()); 
  
  //Check if there is a valid domain
  if(domainMax < domainMin){
    console.log(domainMin);
    console.log(domainMax);
    alert("Invalid Domain");
  }
  var domainLength = domain;
  //Calculate the increment size based on how long the domain is and xScale
  var domainIncrement = xScale * domain/20;
  
  //round numIncrement to the nearest integer
  var numIncrement = Math.round(20 / xScale);
  var location;
  
  //Iterate through the domain and calculate points at a small increment (xScale)
  for(var i = 0; i < numIncrement; i++){
    //Calculate the specific location in the domain and store it in location
    location = ((domainIncrement * i + domainMin).toFixed(accuracy));
    
    //Store the domain value with its corresponding equation
    outputBuffer[equation][0][i] = location;
    
    //If they corresponding y value is larger tha the specified range, store it
    //as the top or bottom of the range
    if(large == 1){
      outputBuffer[equation][1][i] = range * 2;
    }else if(large == -1){
      outputBuffer[equation][1][i] = range * -2;
    }
    else if(large == 0){
      location = location.toString();
      //Use the calculate function to calculate the y value for the specific 
      //location in the domain
      outputBuffer[equation][1][i] = calculate(input,location);
      //Check if the user has inputted an Unequal number of parentheses
      if(outputBuffer[equation][1][i] == "UNEQUAL"){
        throwError("There is an unequal number of parentheses!");
        return;
      }
      //Check if the output is too large or too small
      if(outputBuffer[equation][1][i]>9000000){
        outputBuffer[equation][1][i] = range * 2;
        large = 1;
      }
      if(outputBuffer[equation][1][i]<-9000000){
        outputBuffer[equation][1][i] = range * -2;
        large = -1;
      }
      if(outputBuffer[equation][1][i]<0.000001 && outputBuffer[equation][1][i]> -0.000001){
        outputBuffer[equation][1][i] = 0;
      }
    }  
  
    
  }
  //If at the calculated domain is smaller than the specified domain, calculate 
  //the point at the end of the domain so the graph looks continuous.
  if(location < domainMax){
    outputBuffer[equation][0][numIncrement] = domainMax;
    outputBuffer[equation][1][numIncrement] = calculate(input,(domainMax.toString()));
  }
  return numIncrement;
}

//Set up canvas to draw the graph on
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Set up mousemove function
c.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(c, evt);
        var rect = c.getBoundingClientRect();
        if(mousePos.x > rect.right-180 || mousePos.x < 10){
          mouseIsDown = false;
        }
        if(mousePos.y > rect.bottom - 180 || mousePos.y < 10){
          mouseIsDown = false;
        }

      }, false);
      
//getMousePos gets the coordinates of the mouse
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var mouseIsDown = false;

//If the mouse is pressed track the current position of the graph
c.onmousedown = function(e){
  
    tempXOffSet = xOffset;
    tempYOffSet = yOffset;
    originalX =  mousePos.x;
    originalY =  mousePos.y;
    mouseIsDown = true;
}
//Do a final calculation when the mouse is released
c.onmouseup = function(e){
    calculator();
    mouseIsDown = false;
}

//Update the x and y offset values if the mouse is moved and is pressed
//Calculate the graph on every update so it has a smooth feel
c.onmousemove = function(e){
    if(!mouseIsDown) return;
    
    yOffset = (mousePos.y - originalY)*1.7 + tempYOffSet;
    xOffset = (mousePos.x - originalX)*1.1 + tempXOffSet;
    var pos = 1200 - xOffset;
    domainMax =  pos/(1200 / domain);
    domainMin = domainMax - domain;
    
        calculator();
        
      graph(2000);
      updateRanges();
      
    return false;
}


//Reset the graph to default values when this function is run
function home(){
  xOffset = 600;
  yOffset = 450;
  domain = 20;
  var pos = 1200 - xOffset;
  domainMax =  pos/(1200 / domain);
  domainMin = domainMax - domain;
  range = 10;
  accuracy =3;
  zoomCounter = 0;
  calculator();
  updateRanges();
}

//Increase both the domain and range values by *2 and graph
function zoomOut(){
  domain *= 2;
  range *= 2; 
  var pos = 1200 - xOffset;
  domainMax =  pos/(1200 / domain);
  domainMin = domainMax - domain;
  if(accuracy >3){
    accuracy --;
  }
  zoomCounter ++;
  calculator();
  graph(2000);
  updateRanges();
}

//Decrease both the domain and range values by /2 and graph
function zoomIn(){
  if(zoomCounter > -4){
    domain /= 2;
    range /= 2; 
    var pos = 1200 - xOffset;
    domainMax =  pos/(1200 / domain);
    domainMin = domainMax - domain;
    if(accuracy <7){
      accuracy ++;
      zoomCounter--;
    }
    
    calculator();
  }
  graph(2000);
  updateRanges();
}

//updateRanges calculates and displays the domain and ranges on the screen
function updateRanges(){
  rangeMax =  yOffset/(900 /range);
  rangeMin = rangeMax - range;
  domainStep = (domainMax - domainMin) / 20;
  rangeStep = range / 10;
  $("#range-min").html(rangeMin.toFixed(2));
  $("#range-max").html(rangeMax.toFixed(2));
  $("#domain-min").html(domainMin.toFixed(2));
  $("#domain-max").html(domainMax.toFixed(2));
  $("#x-increment").html("x-increment: " + domainStep.toFixed(2));
  $("#y-increment").html("y-increment: " + rangeStep.toFixed(2));
}

//drawGrid draws the grid lines based on the x and y offsets
function drawGrid() {
  ctx.strokeStyle="#000000";
  ctx.beginPath();
  ctx.shadowBlur=0;
  ctx.lineWidth=3.5;
  ctx.moveTo(xOffset,0);
  ctx.lineTo(xOffset,900);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0,yOffset);
  ctx.lineTo(1200, yOffset);
  ctx.stroke();
  ctx.lineWidth=0.5;

  for(i = 0; i < (xOffset / 60); i++){
    ctx.beginPath();
    ctx.moveTo(((-60 * i) + xOffset) , 0);
    ctx.lineTo(((-60 * i) + xOffset) , 900);
    ctx.stroke();

  }
  for(i = 0; i < (1200 - (xOffset / 60)); i++){
    ctx.beginPath();
    ctx.moveTo(((60 * i) + xOffset) , 0);
    ctx.lineTo(((60 * i) + xOffset) , 900);
    ctx.stroke();

  }

  for(i = 0; i < (yOffset / 45); i++){
    ctx.beginPath();
    ctx.moveTo(0, ((-90 * i) + yOffset));
    ctx.lineTo(1200, ((-90 * i) + yOffset));
    ctx.stroke();

  }
  for(i = 0; i < (900 - (yOffset / 45)); i++){
    ctx.beginPath();
    ctx.moveTo(0, ((90 * i) + yOffset));
    ctx.lineTo(1200, ((90 * i) + yOffset));
    ctx.stroke();
  }
}


//graph takes in the how many steps there are in the domain,
//and graphs it on the canvas
function graph(numberOfSteps) {
  //console.log(numberOfSteps);
  dLength = domain;
  
  //Clear the canvas for a new graph.
  ctx.clearRect(0, 0, c.width, c.height);
  
  //Draw the grid lines
  drawGrid();
  ctx.strokeStyle="#2978A0";
  ctx.lineWidth=3;
  
  for(var j = 0; j< outputBuffer.length; j++){
    for(var i = 0; i < numberOfSteps; i ++){
      
        //Check if there is a corresponding y value for the x value
        if(outputBuffer[j][1][i+1] != "NaN" && outputBuffer[j][1][i] != "NaN"){
          
          //Check discontinuity by measuring the difference between points.
          //If the difference is greather than 20, the graph is most likely 
          //discontinous, and there is a line break.
          
          if(outputBuffer[j][1][i+1] - outputBuffer[j][1][i] > 20 || outputBuffer[j][1][i+1] - outputBuffer[j][1][i] < -20){
            continue;
          }
  
          //Calculate where each point goes on the graph, and load those values
          //into the xcoord and ycoord variables. 
          ctx.beginPath();
          xCoord1 = (outputBuffer[j][0][i] * (1200 / (dLength))) + xOffset;
          yCoord1 = (outputBuffer[j][1][i] * (-900 / (range))) + yOffset;
          xCoord2 = (outputBuffer[j][0][i+1] * (1200 / (dLength))) + xOffset;
          yCoord2 = (outputBuffer[j][1][i+1] * (-900 / (range))) + yOffset;
  
          //Plot the points and draw a line between them. 
          ctx.moveTo(xCoord1, yCoord1);
          ctx.lineTo(xCoord2, yCoord2);
          ctx.stroke();
        
      }
    }
  }
  //If there a regression being graphed, plot the points that are being regressed
  if(regressing == true){
          plotPoints();
  }
}

//parsed converts the latex input into a string with correct symbols.
function parsed(input) {
  
  //get rid of latex formatting characters
  input = input.replace(/\\frac/g, '');
  input = input.replace(/\\cdot/g, '*');
  input = input.replace(/\\left/g, '');
  input = input.replace(/\\right/g, '');
  input = input.replace(/}{/g, '/');
  input = input.replace(/{/g, '(');
  input = input.replace(/}/g, ')');
  input = input.replace(/\\/g, '');
  
  //remove spaces
  input = input.replace(/\s/g,'');
  
  //insert * (multiplication symbol) between x's. Check for certain cases to avoid
  for (var i = 0; i < input.length; i ++) {
    if (input[i] === "x" && i !== 0) {
      if (input[i - 1] !== "-" && input[i - 1] !== "*" && input[i - 1] !== "/" && input[i - 1] !== "(" && input[i - 1] !== "+" && input[i - 1] !== "-" && input[i - 1] !== "^") {
        input = input.splice(i, 0, "*");
      }
    }
    
    /*Latex has an inconsistent formatting for log, so we need to fix that
    There are three possible states for a log function:
        - Log(10) (no base)
        - Log_3(10) (One character long base)
        - Log_(35)(10) (Multiple Character long base)
        
    If There is no base, we let that be.
    If there is a one character base, we convert it to the form,
        Log_[3]_10
    If there is a multiple character base, we convert it to the form,
        Log_[35]_(10)
    */
    if(i > 2 && input.substr(i-3,3) == "log"){
      if(input[i] == "_"){
        
        if(input.substr(i + 1,1) == "("){
          //console.log(input);
          input = replaceAtLoc(input, i+1, "");
          input = input.splice(i+1,0,"[")
          var baseOffset = rightofOperator(input,i+3);
          input = input.splice(i+5+baseOffset,0,"]_");
          input = replaceAtLoc(input, i+4+baseOffset, "");
        }
        else{
          input = input.splice(i+1,0,"[");
          var baseOffset = rightofOperator(input,i+2);
          input = input.splice(i+3+baseOffset,0,"]_");
          
        }
      }
    }
   
    //Input * (multiplication symbol) before parentheses for certain cases. Check for those cases
    if (input[i] === "(" && i !== 0 && input.substr([i-3],3) !== "log" && input[i - 1] !== "+" && input.substr([i-3],3) !== "sin" && input.substr([i-3],3) !== "cos" && input.substr([i-3],3) !== "tan") {

      if (input[i - 1] !== "*" && input[i - 1] !== "/" && input[i - 1] !== "(" && input[i - 1] !== "-" && input[i - 1] !== "^" && input[i - 1] !== "_"&& input[i - 1] !== "[") {
        input = input.splice(i,0,"*");
      }
    }
    
    //Put parentheses around ambiguously defined cases such as 2x^3.
    //    -Change it to 2*(x^3)
    if (input[i] === "-" && input[i + 1] === "x" && input[i + 2] === "^") {
      input = input.splice(rightofOperator(input, (i + 2)) + i + 3, 0, ")");
      input = input.splice(i + 1, 0, "(");
      
    } else if (input[i] === "-" && input[i + 1] === "x") {
      input = input.splice(i + 2, 0, ")");
      input = input.splice(i + 1, 0, "1(");
    }
  }
  
  if (!printedParse) { console.log(input); printedParse = true; }
  
  //Wrap the input in parentheses because the calculator function uses 
  //parentheses to indicate the another calculation round
  input = "("+input+")";
  return input;
}
/*
  - The calculate function takes an input, such as "(x*2)" , "5"
    It returns the solution, so in this case, it is 10
  - The function works in rounds, where each round selects the rightmost opening
    parentheses because that will always be the innermost set of parentheses. 
  - If there is a special function (sin, cos, tan, etc...) calculate sets a flag 
    before solving the parentheses.
  - It runs a Exponent function that scans through the equation and solves any 
    exponents
  - It runs a Multiplication/Division function that scans through the equation
    and solves any * or /
  - It runs a Addition/Subtraction function that scans throught the remaining 
    equation and solves for + or -
  - Once the selected section has been solved, it checks if any flags were set
    for special functions. It performs the special function over the selected 
    section, and then replaces the original section with the solved version. 
  - The function repeats these steps until there are no more parentheses left. 
  
    Example:
      - "((4-5*(x^2))/2)", "2"      Starting Input
      - ((4-5*(2^2))/2)             Plug in the x value
      - (2^2)                       Select the rightmost opening Parentheses
      - 4                           Solve Exponents
      - ((4-5*4)/2)                 Substitute back into the original equation
      - (4-5*4)                     Select rightmost opening parentheses
      - (4-20)                      Solve Multiplication
      - -16                         Solve Subtraction
      - (-16/2)                     Substitute back into the original equation
      - (-16/2)                     Select rightmost opening parentheses
      - -8                          Solve Division
      - -8                          No more parentheses so we are done
*/
function calculate(input,xValue){
  
  //parse the latex input into a consistent usable format
  input = parsed(input);
  
  var infiniteLoop = false;
  var infCounter = 0;
  
  //This is the main loop that performs the rounds
  while(true){
    //Check if there are any more parentheses
    if(input.indexOf("(") > -1){
      
      //Parentheses() selects the rightmost openeing parentheses, and sets 
      //any necessary flags
      var step1 = Parentheses(input);
      
      //Return if there are an unequal number of parentheses with an error message
      if(step1 == "UNEQUAL"){
        return "UNEQUAL";
      }
      
      //Save the original Input
      originalInput = step1;
      
      //Exponent() substitutes in x and solves for exponents. 
      var step2 = Exponent(step1,xValue);
      
      //Remove any sign errors
      step2 = step2.replace(/\+-/g, "-");
      step2 = step2.replace(/\--/g, "+");
      step2 = step2.replace(/\++/g, "+");
      
      //MultDiv() solves for multiplication and division
      var step3 = MultDiv(step2);
      
      //Remove any sign errors
      step3 = step3.replace(/\+-/g, "-");
      step3 = step3.replace(/\--/g, "+");
      step3 = step3.replace(/\++/g, "+");
      
      //AddSub() solves for addition and subraction
      var step4 = AddSub(step3);
      
      //Remove any sign errors
      step4 = step4.replace(/\+-/g, "-");
      step4 = step4.replace(/\--/g, "+");
      step4 = step4.replace(/\++/g, "+");
      
      //Add parentheses around the first step so they are removed when 
      //substituted back in
      var step5 = "(" + step1 + ")";
      
      //If log flag was set to true, perform the log function and remove it
      if(log == true){
        var logPos = input.indexOf("log");
        if(input.substr(3+logPos,1) != "_"){
          var base = 10;
          step5 = "log(" + step1 + ")";
        }
        else{
          step4 = step4.substr(step4.length - leftofOperator(step4, step4.length));
          
          var bracketPos = input.indexOf("[");
          var bracketLength = rightofOperator(input,bracketPos);
          //console.log(bracketPos, bracketLength);
          var base = input.substr(bracketPos+1,bracketLength);
          base = base.replace("(","");
          base = base.replace(")","");
          step5 = "(" + step1 + ")";
          
          
        }
        step4 = (Math.log(parseFloat(step4)) / Math.log(base)).toFixed(accuracy + 2);
        
      }
      
      //Check if a flag was set true, solve, and round to a specified accuracy
      if(sin == true){
        step4 = Math.sin(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      if(cos == true){
        step4 = Math.cos(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      if(tan == true){
        step4 = Math.tan(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      if(arctan == true){
        step4 = Math.atan(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      if(arccos == true){
        step4 = Math.acos(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      if(arcsin == true){
        step4 = Math.asin(parseFloat(step4)).toFixed(accuracy + 2);
        
      }
      
      //Set the functions to false
      if(log == true){
        log = false;
      }
      if(sin == true){
        step5 = "sin(" + step1 + ")";
        sin = false;
      }
      if(cos == true){
        step5 = "cos(" + step1 + ")";
        cos = false;
      }
      if(tan == true){
        step5 = "tan(" + step1 + ")";
        tan = false;
      }
      if(arctan == true){
        step5 = "arctan(" + step1 + ")";
        arctan = false;
      }
      if(arccos == true){
        step5 = "arccos(" + step1 + ")";
        arccos = false;
      }
      if(arcsin == true){
        step5 = "arcsin(" + step1 + ")";
        arcsin = false;
      }
      printLog(step5);
      
      //Substitute the solved solution back into the original equation
      input = input.replace(step5, step4);
      printLog(input);
      
      //Return if more than 15 rounds are completed
      if (infCounter > 15 ) {
        throwError("Too many calculations");
        return NaN;
      }
      infCounter ++;
    }
    else{
      
      //Return an error if the calculated result is NaN
      if ((isNaN(input) || !IsNumeric(input)) && input !== "") {
        throwError("Invalid input!");
        return NaN;
      }
      //Return the final result
      return input;
      
    }
  }
}

//Takes in a string for an equation section to be solved for addition or subraction
function AddSub(input){
  
  //If the first character is a '+' sign remove it
  if(input.indexOf("+") == 0){
    input = replaceAtLoc(input,0,"");
  }
  
  var flag = true;
  var operatorPos = -1;
  var subtraction = false;
  var augend;
  var addend;
  var sum;
  var counter;
  var leftOffset; 
  var rightOffset;
  var workString;
  
  //This function loops until all of the + and - signs are removed
  while(flag){
    
      //This next section checks if there are any + or - left, and finds the position
      //of the first one. It stores the position of the operator in operatorPos, and 
      //uses the flag subtraction to specify which sign it is.
      if((input.indexOf("+") > 0)){
        
        if((input.indexOf("-",1) > 0)){
          
          if(input.indexOf("+", 1) > input.indexOf("-", 1)){
            operatorPos = input.indexOf("-", 1);
            subtraction = true;
          }
          else{
            operatorPos = input.indexOf("+");
            
            subtraction = false;
          }
        }
        else{
            operatorPos = input.indexOf("+");
            subtraction = false;
        }
        
      }
      else{
        
        if((input.indexOf("-",1) > 0)){
            operatorPos = input.indexOf("-",1);
            subtraction = true;
        }
        else{
            operatorPos = -1;
            subtraction = false;
        }
      }
      
    //If a + or - was found, perform this function
    if(operatorPos > -1){
      
    //leftOfOperator returns how many characters long the number to the left of
    //the operator is.
    leftOffset = leftofOperator(input, operatorPos);
    
    //rightofOperator returns how many characters long the number to the right of
    //the operator is.
    rightOffset = rightofOperator(input, operatorPos);
    
    //Find the augend and addend from the rightOffset and the leftOffset
    augend = input.substr(operatorPos - leftOffset, leftOffset);
    addend = input.substr(operatorPos + 1, rightOffset);
      
      //Check if the augend is negative
      if(augend.indexOf("-") > -1){
        
       augend = parseFloat(augend.substr(1));
       augend *= -1;
      }
      else{
        augend = parseFloat(augend);
      }
      
      //Check if the addend is negative
      if(addend.indexOf("-") > -1){
       addend = parseFloat(addend.substr(1));
       addend *= -1;
      }
      else{
        addend = parseFloat(addend);
      }
      
      //Perform the correct operation
      if(subtraction === true){
        sum = augend - addend;
      }
      else{
        sum = augend + addend;
      }
    
     
    //Substitute the solution back into the original string
    workString = input.substr(operatorPos - leftOffset, leftOffset + rightOffset + 1);
    input = input.replace(workString, sum.toFixed(accuracy));
     
     counter++;
     
    }
    else{
      flag = false;
    }
    
  }
  return input;

}
//Takes in a string for an equation section to be solved for multiplication or division
function MultDiv(input){
  
  printLog(input);
  originalInput = input;
  var flag = true;
  var operatorPos = -1;
  var division = false;
  var multiplicand;
  var multiplier;
  var product;
  var counter;
  var leftOffset; 
  var rightOffset;
  var workString;
  
  //This function loops until all of the * and / signs are removed 
  while(flag){
    
      //This next section checks if there are any * or / left, and finds the position
      //of the first one. It stores the position of the operator in operatorPos, and 
      //uses the flag division to specify which sign it is.
      if((input.indexOf("*",1) > 0)){
        
        if((input.indexOf("/",1) > 0)){
          
          if(input.indexOf("*", 1) > input.indexOf("/", 1)){
            operatorPos = input.indexOf("/", 1);
            division = true;
          }
          else{
            operatorPos = input.indexOf("*", 1);
            division = false;
          }
        }
        else{
            operatorPos = input.indexOf("*",  1);
            division = false;
        }
        
      }
      else{
        if((input.indexOf("/") > 0)){
            operatorPos = input.indexOf("/");
            division = true;
        }
        else{
            operatorPos = -1;
            division = false;
        }
      }
    
    //If a * or / was found, perform this function
    if(operatorPos > -1){
  
    //leftOfOperator returns how many characters long the number to the left of
    //the operator is.
    leftOffset = leftofOperator(input, operatorPos);
     
    //rightOfOperator returns how many characters long the number to the right of
    //the operator is.
    rightOffset = rightofOperator(input, operatorPos);
    
    //Determine the multiplicand and multiplier from the left and right offsets
    multiplicand = input.substr(operatorPos - leftOffset, leftOffset);
    multiplier = input.substr(operatorPos + 1, rightOffset);
    
    //Check if multiplicand is negative
    if(multiplicand.indexOf("-") > -1){
      multiplicand = parseFloat(multiplicand.substr(1));
      multiplicand *= -1;
    }
    else{
      multiplicand = parseFloat(multiplicand);
    }
    
    //Check if multiplier is negative
    if(multiplier.indexOf("-") > -1){
      multiplier = parseFloat(multiplier.substr(1));
      multiplier *= -1;
    }
    else{
      multiplier = parseFloat(multiplier);
    }
    
    //Perform the specified operation
    if(division === true){
      product = multiplicand / multiplier;
    }
    else{
      product = multiplicand * multiplier;
    }
    
    //Substitute the solution back into the original equation
    workString = input.substr(operatorPos - leftOffset, leftOffset + rightOffset + 1);
    if(originalInput == workString){
      input = input.replace(workString, product.toFixed(accuracy));
      printLog(input);
    }
    else{
      workString = input.substr(operatorPos - leftOffset, leftOffset + rightOffset + 1);
      input = input.replace(workString, "");
      input += "+" + product.toFixed(accuracy);
      printLog(input);
    }
     
    counter++;
     
    }
    else{
      flag = false;
    }
    
  }
  return input;
   
}

//leftofOperator takes in an input string and the location of an operator.
//It returns number of characters to the left of the operator
function leftofOperator(input,operator){
  
  //validArray holds the valid characters that could be in a number
  var validArray = ["0","1","2","3","4","5","6","7","8","9","."];
  
  //For 20 iterations, we check and see if the character in the next position is valid.
  //If its not valid, return the location
  for(var i = 1; i<20; i++){
       var pos;
       pos = input.substr(operator - i, 1);
    
       if(operator - i < 0){
         return i - 1;
       }
       else{
          if(validArray.indexOf(pos) < 0){
            if(pos == '-'){
              return i;
            }
            return i - 1;
          }
       }
    }
}

//rightofOperator takes in an input string and the location of an operator.
//It returns number of characters to the right of the operator
function rightofOperator(input,operator){
  
  //validArray holds the valid characters that could be in a number
  var validArray = ["0","1","2","3","4","5","6","7","8","9","."];
  
  //For 20 iterations, we check and see if the character in the next position is valid.
  //If its not valid, return the location
  for(var i = 1; i<20; i++){
    if(i == 1 && input.substr(operator + 1, 1) == "-"){
      continue;
    }
       var pos;
       pos = input.substr(operator + i, 1);
    
       if(operator + i > input.length){
         return i - 1;
       }
       else{
          if(validArray.indexOf(pos) < 0){
            return i - 1;
          }
       }
    }
}

//This function takes in an input string, and an input x value
function Exponent(input,xValue){

  //Substitute the x value into the equation
  input = input.replace(/x/g, xValue);
  var flag = true;
  var operatorPos = -1;
  var base;
  var negBase = false;
  var exp;
  var power;
  var counter;
  var leftOffset; 
  var rightOffset;
  var workString;
  
  //This function loops until all of the ^ signs are removed 
  while(flag){
    
    operatorPos = input.indexOf("^", operatorPos+1);
    
    //If a ^ was found, perform this function
    if(operatorPos > -1){
      
      //leftOfOperator returns how many characters long the number to the left of
      //the operator is.
      leftOffset = leftofOperator(input, operatorPos);
     
      //rightofOperator returns how many characters long the number to the right of
      //the operator is.
      rightOffset = rightofOperator(input, operatorPos);
     
      //Find the base and exponent based off of the left and right offset
      base = parseFloat(input.substr(operatorPos - leftOffset, leftOffset));
      exp = parseFloat(input.substr(operatorPos + 1, rightOffset));
      
      //Calculate the power
      power = Math.pow(base,exp);
     
      //Substitute the solution into the original equation
      workString = input.substr(operatorPos - leftOffset, leftOffset + rightOffset + 1);
      input = input.replace(workString, power.toFixed(accuracy));
     
      counter++;
    }
    else{
      flag = false;
    }
  }
  return input;
}

//This function takes in the entire original input, selects the innermost section
//of parentheses, and sets any special function flags
function Parentheses(input){
  
  var flag = true;
  var openCounter = 0;
  var closeCounter = 0;
  var tempOpenLocation = 0;
  var tempCloseLocation= 0;
  var firstCloseLocation = -1;
  var lastOpenLocation = -1
  
  //Iterate through the input strign and locate the parentheses
  while(flag){
    
    //Find the index of the first opening and closing parentheses
    tempOpenLocation = input.indexOf("(",tempOpenLocation);
    tempCloseLocation = input.indexOf(")",tempCloseLocation);
    
    //If there is an opening parentheses, move the position counter forward to
    //check if there are any more. If there is no opening parentheses, return.
    if( tempOpenLocation > -1){
      lastOpenLocation= tempOpenLocation + 1;
      openCounter++;
      tempOpenLocation++;
    }
    else{
      flag = false;
    }
    
    //If there is a closing parentheses move the position counter forward.
    //If there is no closing parehtneses, return.
    if( tempCloseLocation > -1){
      if(firstCloseLocation == -1){
        firstCloseLocation = tempCloseLocation;
      }
      closeCounter++;
      tempCloseLocation++;
    }
    else{
      flag = false;
    }
    
  }
  
  //If the number of parentheses is unequal, return with an error.
  if(openCounter != closeCounter){
    throwError("There is an unequal number of parenthesis!");
    return "UNEQUAL";
  }
  
  //If the section of parentheses has a log proceding it, set log to be true. This checks if there is a base
  var logAnalysis = input.substr(lastOpenLocation, ((input.indexOf(")",lastOpenLocation))  - lastOpenLocation));
  
  if(logAnalysis.indexOf("log") > -1){
    log = true;
  }
  
  //If the section of parentheses has a log proceding it. This doesn't check if there is a base.
  if(input.substr(lastOpenLocation -4 , 3) == "log"){
    log = true;
    
  }
  //This sets the arcsin flag to true if there is the word arcsin proceding the set of parentheses.
  if(input.substr(lastOpenLocation - 7, 6) == "arcsin"){
    arcsin = true;
  }
  //This sets the sin flag to true if there is the word sin proceding the set of parentheses.
  else if(input.substr(lastOpenLocation - 4, 3) == "sin"){
    sin = true;
  }
  
  //This sets the arccos flag to true if there is the word arccos proceding the set of parentheses.
  if(input.substr(lastOpenLocation - 7, 6) == "arccos"){
    arccos = true;
  }
  //This sets the cos flag to true if there is the word cos proceding the set of parentheses.
  else if(input.substr(lastOpenLocation - 4, 3) == "cos"){
    cos = true;
  }
  
  //This sets the arctan flag to true if there is the word arctan proceding the set of parentheses.
  if(input.substr(lastOpenLocation - 7, 6) == "arctan"){
    arctan = true;
  }
  //This sets the tan flag to true if there is the word tan proceding the set of parentheses.
  else if(input.substr(lastOpenLocation - 4, 3) == "tan"){
    tan = true;
  }
  
  //If there are no more parentheses left, return the string. 
  //If there are parentheses, the innermost layer of the equation.
  if(openCounter === 0){
    return input;
  }
  else{
    return input.substr(lastOpenLocation, ((input.indexOf(")",lastOpenLocation))  - lastOpenLocation));
  }
  
}

//This helper function replaces a substring with another substring at a specific location
function replaceAtLoc(input, loc, repl){
  //console.log(input);
  var first = input.substr(0,loc);
  var second = input.substr(loc + 1);
  return first + repl + second; 
}

//This helper function modifies the console.log function and allows us to toggle all of the
//printLog statements by setting the PRINT_FLAG variable.
function printLog(input){
  if(PRINT_FLAG == false){
    console.log(input);
  }
}