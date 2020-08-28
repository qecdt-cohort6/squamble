var levelId = "LVL_1"
var isSquambled = false

function mix (){
  isSquambled = true
  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[1].changeweight(-0.01)
      edgeArray[3].changeweight(0.01)

      edgeArray[6].changeweight(-0.01)
      edgeArray[14].changeweight(0.01)

      edgeArray[11].changeweight(-0.01)
      edgeArray[9].changeweight(0.01)

      edgeArray[12].changeweight(-0.01)
      edgeArray[4].changeweight(0.01)
}, i*200);
  }

}
function istutorial(){
  return false
}
