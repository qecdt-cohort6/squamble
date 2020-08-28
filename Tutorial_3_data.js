var levelId = "TUT_3"
var isSquambled = false

function mix (){
  isSquambled = true

  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[5].changeweight(-0.01)
      edgeArray[4].changeweight(0.01)

      edgeArray[0].changeweight(-0.01)
      edgeArray[1].changeweight(0.01)

}, i*200);
  }
  setTimeout(function(){
    for(var i = 0; i < 25 ; i++){
      setTimeout(function(){
        edgeArray[0].changeweight(0.01)
        edgeArray[3].changeweight(-0.01)

        edgeArray[12].changeweight(-0.01)
        edgeArray[15].changeweight(0.01)

  }, i*200);
}
}, 5000);

}

function istutorial(){
  return true
}

function LevelMessages(){
  return ["Squamble!", "As you may have noticed from the squanimation, there are two different cycles in this level.","Try adjusting the first cycle, then press submit.", "The level isn't finished as there are still negative values. Now you can shift + click to select a new cycle."]
}
