var levelId = "LVL_2"
var isSquambled = false

function mix (){
  isSquambled = true
  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[9].changeweight(-0.02)
      edgeArray[7].changeweight(-0.02)
      edgeArray[14].changeweight(-0.02)

      edgeArray[11].changeweight(0.02)
      edgeArray[13].changeweight(0.02)
      edgeArray[6].changeweight(0.02)

}, i*200);
  }
  setTimeout(function(){
    for(var i = 0; i < 25 ; i++){
      setTimeout(function(){
        edgeArray[15].changeweight(0.01)
        edgeArray[0].changeweight(0.01)

        edgeArray[12].changeweight(-0.01)
        edgeArray[3].changeweight(-0.01)

  }, i*200);
}
}, 5000);

}
function istutorial(){
  return false
}
