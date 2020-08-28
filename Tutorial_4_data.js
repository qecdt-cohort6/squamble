var levelId = "TUT_4"
var isSquambled = false

function mix (){
  isSquambled = true

  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[4].changeweight(-0.01)
      edgeArray[1].changeweight(0.01)

      edgeArray[13].changeweight(-0.01)
      edgeArray[7].changeweight(0.01)

      edgeArray[3].changeweight(-0.01)
      edgeArray[12].changeweight(0.01)
}, i*200);
  }

}
function istutorial(){
  return true
}

function LevelMessages(){
  return ["This is the last tutorial level. You know what to do!","Here's a clue: you will need to choose a cycle with 3 nodes.", "In some future levels, there's more than one way of solving it."," When you've solved it one way, why not press reset and try to find the other?", "Good luck and happy squambling!"]
}
