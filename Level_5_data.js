var levelId = "LVL_5"
var isSquambled = false

function mix (){
  isSquambled = true

  for(var i = 0; i < 5 ; i++){
    setTimeout(function(){
      edgeArray[23].changeweight(-0.01)
      edgeArray[27].changeweight(-0.01)
      edgeArray[28].changeweight(-0.01)
      edgeArray[0].changeweight(-0.01)
      edgeArray[6].changeweight(-0.01)
      edgeArray[18].changeweight(-0.01)

      edgeArray[22].changeweight(0.01)
      edgeArray[16].changeweight(0.01)
      edgeArray[4].changeweight(0.01)
      edgeArray[3].changeweight(0.01)
      edgeArray[31].changeweight(0.01)
      edgeArray[26].changeweight(0.01)

}, i*200);
  }
  setTimeout(function(){
    for(var i = 0; i < 10 ; i++){
      setTimeout(function(){
        edgeArray[9].changeweight(-0.01)
        edgeArray[14].changeweight(-0.01)
        edgeArray[18].changeweight(-0.01)
        edgeArray[21].changeweight(-0.01)

        edgeArray[10].changeweight(0.01)
        edgeArray[22].changeweight(0.01)
        edgeArray[17].changeweight(0.01)
        edgeArray[13].changeweight(0.01)

  }, i*200);
};
}, 1000);
setTimeout(function(){
  for(var i = 0; i < 5 ; i++){
    setTimeout(function(){
      edgeArray[0].changeweight(-0.01)
      edgeArray[5].changeweight(-0.01)
      edgeArray[9].changeweight(-0.01)
      edgeArray[14].changeweight(-0.01)
      edgeArray[18].changeweight(-0.01)
      edgeArray[23].changeweight(-0.01)
      edgeArray[27].changeweight(-0.01)
      edgeArray[28].changeweight(-0.01)

      edgeArray[3].changeweight(0.01)
      edgeArray[31].changeweight(0.01)
      edgeArray[26].changeweight(0.01)
      edgeArray[22].changeweight(0.01)
      edgeArray[17].changeweight(0.01)
      edgeArray[13].changeweight(0.01)
      edgeArray[8].changeweight(0.01)
      edgeArray[4].changeweight(0.01)

}, i*200);
};
}, 3000);
}
function istutorial(){
  return false
}
