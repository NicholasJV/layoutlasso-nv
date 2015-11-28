app.controller("CreateLayoutCtrl", function($scope, $compile){

  var options = {
      cell_height: 80,
      vertical_margin: 0,
      margin: 0,
      width: 12,
      float: true
  };

  $scope.main_grid = $('#main-grid').gridstack(options).data('gridstack');
  $scope.remove = "x";
  $scope.counter = 0;
  $scope.grid_counter = 1;
  $scope.res = [];

  // key is the gridId, value is the grid object
  $scope.nestedGrids = {};
  $scope.nestedGrids["main-grid"] = $scope.main_grid;

// helper function to create a new element
var createElement = function(id, content) {
  var content = content || "Your content here";
  var el = $compile("<div class='grid-stack-item' id=" +
  id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'>\
  <div class='lasso-user-content'>" + content + "</div><div class='lasso-end-user-content'></div>\
  </div></div>\
  <div class='row'>\
  <div class='lasso-button-box'>\
  <button ng-click='removeWidget(" + id + ")'> {{ remove }} </button>\
  <button class='lasso-x' id='lasso-x-btn-"+ id +"' ng-click='addNestedGrid(" +
  id + ")' class='btn btn-default lasso-nest-btn' id='lasso-nest-btn-"+
  id +"'>Nest Grid</button>\
  </div></div></div>")($scope);
  return el;
}

// adds a new grid to the main grid
  $scope.addNewGridElement = function(grid){
    grid = grid || $scope.main_grid;
    $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
    var el = createElement($scope.counter);
    var newWidget = grid.add_widget(el, 0, 0, 1, 1, true);
  }

  $scope.addNestedGrid = function(id){
      var thisWidget = $('#' + id);
      // remove buttons
      $('#lasso-nest-btn-'+id).remove();
      $('#lasso-x-btn-'+id).remove();

      // make selected widget into a grid
      $scope.grid_counter++;
      var newGridID = "grid" + $scope.grid_counter;
      thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      newGridID+ "'></div>")($scope));

      // save the new grid to nestedGrids object on the $scope
      var newGrid = $('#' + newGridID).gridstack(options).data('gridstack');
      $scope.nestedGrids[newGridID] = newGrid;

      // add an Add Widget Button to the newly nested grid
      $( "#" + id + " .lasso-button-box")
      .append($compile("<button ng-click='addNewGridElement(nestedGrids." + newGridID + ")'>Add Widget</button>")($scope));
  }

  $scope.removeWidget = function (idNum){
        var grid = $('.grid-stack').data('gridstack')
        el = $('#' + idNum);
        grid.remove_widget(el);
  }



  // ========================= Saving, clearing and loading grids to/from scope (so far) ================================ //
  $scope.saveGrid = function (){
    console.log("scope res", $scope.res);
    console.log("nestedgrids", _.isEmpty($scope.nestedGrids)); 
    if (_.isEmpty($scope.nestedGrids)){
      $scope.res = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {
          el = $(el);
          var node = el.data('_gridstack_node');
          return {
              id: el.attr('id'),
              x: node.x,
              y: node.y,
              width: node.width,
              height: node.height
          };
      });
    } else {
       console.log("nestedgrids", $scope.nestedGrids); 
       // for each grid within nestedgrids, save the grid using the map funx as above

    }
    alert(JSON.stringify($scope.res));
    console.log("updated", $scope.res);
  }

  $scope.clearGrid = function (){
    $scope.main_grid.remove_all();
  }

  $scope.loadGrid = function (){
    // var serialization = [
    //   {x: 0, y: 0, width: 2, height: 2},
    //   {x: 3, y: 1, width: 1, height: 2},
    //   {x: 4, y: 1, width: 1, height: 1},
    //   {x: 2, y: 3, width: 3, height: 1},
    //   {x: 1, y: 4, width: 1, height: 1},
    //   {x: 1, y: 3, width: 1, height: 1},
    //   {x: 2, y: 4, width: 1, height: 1},
    //   {x: 2, y: 5, width: 1, height: 1}
    // ];

    // serialization = GridStackUI.Utils.sort(serialization);

    // var grid = $('.grid-stack').data('gridstack');
    // grid.remove_all();
   
    console.log("nested grid object", $scope.nestedGrids);

    _.each($scope.res, function (node) {

          var el = createElement(node.id);
          var newWidget = $scope.main_grid.add_widget(el, node.x, node.y, node.width, node.height, true);


     // $scope.addNewGridElement(node);
        // $scope.main_grid.add_widget($('<div><div class="grid-stack-item-content" /></div>'), 
        //     node.x, node.y, node.width, node.height);
    });
  }

  // ========================= Converting To HTML ================================ //
  // This section is for creating a clean copy (without Lasso tools/buttons) of the layout
  // to export for the user's use in their own project.
  // This exportation uses the Gridstack system and requires a bower-install of Gridstack (not Bootstrap).

  $scope.convertedHTML = "";
  $scope.exportGrids = {};
  var userContentRegex = /<div class="lasso-user-content">[\s\S]*?<\/div><div class="lasso-end-user-content"><\/div>/im;

  // static grid that does not allow modification
  var export_options = {
      static_grid: true
  };

  $scope.export_grid = $('#export-grid').gridstack(export_options).data('gridstack');
  $scope.exportGrids["export-grid"] = $scope.export_grid;

  // helper function to create a new EXPORTABLE element - not the same as our internal lasso elements
  var createExportElement = function(id, content) {
    var content = content || "";
    var el = $compile("<div class='grid-stack-item'>\
    <div class='grid-stack-item-content'>\
    <div id='"+ id +"'>" + content + "</div></div></div>")($scope);
    return el;
  }

// adds a new EXPORTABLE grid to the export_grid - a static grid that cannot be modified in Layout Lasso
  var addExportWidget = function(grid, id, content, x, y, w, h){
    grid = grid || $scope.export_grid;
    $scope.counter++; // this may be a problem when we load in a saved grid and remove and add - may have multiple with the same id
    var el = createExportElement(id, content);
    var newWidget = grid.add_widget(el, x, y, w, h, false);
  }

  var addNestedExportGrid = function(thisWidgetId, gridId){
      var thisWidget = $('#' + thisWidgetId);

      // make selected widget into a grid
      var newGridID = "grid" + gridId;
      thisWidget.append($compile("<div class='grid-stack grid-stack-nested' id='" +
      newGridID+ "'></div>")($scope));

      // save the new grid to exportGrids object on the $scope, and return it
      var newGrid = $('#' + newGridID).gridstack(export_options).data('gridstack');
      $scope.exportGrids[newGridID] = newGrid;
      return newGrid;
  }

  $scope.convertToHTML = function() {
// parent is a GRID with the add_widget method on it, and w,h  (not x,y)
// nodes are the widgets on the parent grid, and have x,y,w,h on them

    console.log("button clicked!");
    var nodes, parent;
    for(var key in $scope.nestedGrids) {  // for each grid

      if(key == "main-grid") {   // main grid becomes export grid
        parent = $scope.export_grid;
      } else { // parent grid should be a new nested grid on export grid
        // parent = addNestedExportGrid();
        parent = $scope.nestedGrids[key];
      }
      console.log("parent", parent);
      console.log("parent.grid", parent.grid);
      nodes = $scope.nestedGrids[key].grid.nodes;
      for (var i = 0; i < nodes.length; i++) {  // for each widget in that grid
         var matches = nodes[i].el[0].innerHTML.match(userContentRegex);
         if (matches.length == 0) {
           throw new Error("Error converting to html - No user content found.");
         } else {
           // create a new grid element matching the properties of that one to put on $scope.export_grid
          console.log("content:", matches[0]);
          addExportWidget(parent, nodes[i]._id, matches[0], nodes[i].x, nodes[i].y, nodes[i].width, nodes[i].height);
         }
      }
    }
  }






})
