<p align="center"><img src="https://i.imgur.com/RsUR12v.png" /></p>

### What is it?
Spell "Somsed" backwards, and add a ".com" to the end. We attempted to create a copy of Desmos, one of the best online graphing calculators, for our Algebra II Honors final project. We had over 2,500 lines of code, mainly in JavaScript. We broke down the fundamentals of a graphing calculator, and wrote everything from scratch. Unlike Desmos, though, we also have row-reduced echelon form matrix solving as well as lienar regression tools for polynomial regressions, exponential regressions, logarithmic regressions, and power regressions. Somsed can be accessed at [somsed.solutions](https://somsed.solutions), and is very simple to understand. Click the mode you want to use, and follow the instructions! For graphing, don't include the `y =` at the beginning of the statement, and input your equation (involving `x`) in the bar at the bottom.

## How it works
###### Graphing


  - The calculate function takes an input, such as `(x*2)` , `5`. It returns the solution, so in this case, it is 10.
  - The function works in rounds, where each round selects the rightmost opening parentheses because that will always be the innermost set of parentheses. 
  - If there is a special function (sin, cos, tan, etc...) calculate sets a flag before solving the parentheses.
  - It runs an exponent function that scans through the equation and solves any exponents.
  - It runs a multiplication/division function that scans through the equation and solves any `*`s or `/`s.
  - It runs an addition/subtraction function that scans throught the remaining equation and solves for `+`s or `-`s.
  - Once the selected section has been solved, it checks if any flags were set for special functions. It performs the special function over the selected section, and then replaces the original section with the solved version. 
  - The function repeats these steps until there are no more parentheses left.     
 
  Example:
  `````text

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
`````

###### Solving

- Solve equations takes in the number of equation 1, the number of equation 2, the latex of equation 1, the latex of equation 2, and the `xScale`. It outputs the points of intersection of the two equations.
-  To calculate the interesection of graphs, we first look at the differences of the previous column of points, and the current column of points. If the differences change signs, there is an intersection.
  
  For the graph:
  
  `````text
  6
  5       _____  _________/
  4      /     \/
  3            /\
  2        ___/  \
  1      /        \_________
  0     /                   \
    1 2 3 4 5 6 7 8 9 10 11 12
    
`````
    
- If we look at the differences of the equations at `x = 6`, it is 2. At `x = 8`, the difference is -3. Because there is a sign change, we know there is an intersection.
-  By doing this check in very small increments, we are able to approximate the solutions of two equations. 

###### Matrix Diagonalization
A detailed description of the process used to diagonalize matricies.
http://www.math.fsu.edu/~bellenot/class/f08/lalab/other/rref2.pdf


For a description of how the code specifically works, read the comments for the function:

`````c
rref();
`````
###### Regression

- We use the sum of least squares method to find the line of best fit for our regression calculator. To read more about this visit https://en.wikipedia.org/wiki/Polynomial_regression#Matrix_form_and_calculation_of_estimates

- The sum of least squares method only works for polynomial data sets, so to get our calculator to find exponential, power, and logarithmic regressions, we have to linearize the data.

The process to linearize each regression type goes as follows:
- Exponential: Take the natural log of the x values of the regression data.
-  Power: Take the natural log of the x and y values of the regression data.
- Logartihmic: Take the natural log of the x values, and switch the x and y values 

Then, a linear regression is taken on the data. The values returned from the matrix are used as constants for the non-linear regressions. Look into the code for a more detailed description of how this works.
