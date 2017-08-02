<!DOCTYPE html>
<html>
<head>
  <title>somsed</title>
  <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700" rel="stylesheet">
  <link rel="stylesheet" href="css/index.css" />
  <link rel="stylesheet" href="mathquill/mathquill.css"/>
</head>
<body>
  <nav>
    <img src="logo-white.png" draggable="false"></img>
  </nav>

  <section id="ui">
    <div id="inputbar">
      <div class="func-button" id="graph-button">graph()</div>
      <div class="func-button" id="solve-button">solve()</div>
      <div class="func-button" id="matrix-button">rref()</div>
      <div class="func-button" id="statistic-button">stat()</div>
      <h1><span id="inp"></span></h1>
      <div id="error">
        <div id="exclamation">!</div>
        <div id="error-message">
          No syntax errors! :)
        </div>
      </div>
    </div>
  </section>
  
  <div id="welcome">
    <img src="logo.png" draggable="false"></img>
    <h1>graphing calculator</h1>
    <h3>Period 3 Chaffee, Algebra II Honors 2017, LAHS &bull; Final Project</h3>
  </div>
  
  <div id="solve">
    <h2>Equation 1: <span style="font-weight: 300">y = </span><span id="solve-inp-1"></span></h2>
    <h2>Equation 2: <span style="font-weight: 300">y = </span><span id="solve-inp-2"></span></h2>
    <hr>
    <div id="solve-go">Calculate</div>
    <hr>
    <h1>Answer(s): <span id="solve-answer"></span></h1>
  </div>

  <div id="graph-window">
    <div id="window-settings">
      <div id="plus-button">+</div>
      <div id="home-button">&#11044;</div>
      <div id="minus-button">-</div>
    </div>
    
    <div id="domain-min">-10.00</div>
    <div id="domain-max">10.00</div>
    <div id="range-min">-5.00</div>
    <div id="range-max">5.00</div>
    
    <div id="x-increment">x-increment: 1.00</div>
    <div id="y-increment">y-increment: 1.00</div>
    
    <canvas id="canvas" width="1200" height="900"; style="border: 1px solid #000000;"></canvas>
  </div>
  
  <div id="matrixpop">
    <div id="matrixinput">
      <h3>Input</h3>
      <div id="matrixdimensions">
        Rows: <input id="matrixrows" value="9" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" /> Columns: <span id="matrixcolumns">10</span>
      </div>
      <table id="tableformatrixinput">
        <tr id="inputrow1">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow2">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow3">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow4">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow5">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow6">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow7">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow8">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
        <tr id="inputrow9">
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
          <td><input value="0" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" /></td>
        </tr>
      </table>
    </div>
    <div id="matrixoutput">
      <h3>Output</h3>
      <br /><br />
      <table>
        <tr id="outputrow1">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow2">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow3">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow4">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow5">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow6">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow7">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow8">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr id="outputrow9">
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
      </table>
    </div>
  </div>
  
  <div id="stat">
    <div id="coords-container">
      <h2>Linear Regression<br />(enter coordinates below)</h2>
      <div id="coordinates">
        (<input placeholder="x" id="statistic-input-x" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" />, <input placeholder="y" id="statistic-input-y" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 45" type="text" />)<div id="statistic-add-coordinate">Add</div>
        <br />
        <div id="coord-input"></div>
      </div>
    </div>
    <div id="regress-container">
      <select id="regress-selector">
        <option value="select" selected disabled>select a type of regression</option>
        <option value="polynomial">nth degree polynomial</option>
        <option value="exponential">exponential</option>
        <option value="logarithmic">logarithmic</option>
        <option value="power">power regression</option>
      </select>
      <input placeholder="n" id="polynomial-degree" />
      <div id="regress-button">Regress</div>
      <div id="regress-answer-container">
        <h2>Answer</h2>
        <h3 id="regression-answer"></h3>
        <br />
        <br />
        <h4>R<sup>2</sup> = <div id="rsquared"></div></h4>
        <div id="regress-graph-button">Show Graph</div>
      </div>
    </div>
  </div>
  
  <script src="js/jquery.min.js"></script>
  <script src="mathquill/mathquill.js"></script>
  <script src="js/index.js"></script>
  <script src="js/stat.js"></script>
  <script src="js/ui.js"></script>

</body>
</html>
