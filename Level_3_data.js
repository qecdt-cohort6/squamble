var levelId = "LVL_3"
var isSquambled = false

function mix (){
  isSquambled = true
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[0].changeweight(-0.01)
      edgeArray[10].changeweight(-0.01)

      edgeArray[2].changeweight(0.01)
      edgeArray[8].changeweight(0.01)

  }, i*200);
  }
  setTimeout(function(){
    for(var i = 0; i < 20 ; i++){
      setTimeout(function(){
        edgeArray[1].changeweight(-0.01)
        edgeArray[6].changeweight(-0.01)
        edgeArray[11].changeweight(-0.01)
        edgeArray[12].changeweight(-0.01)

        edgeArray[4].changeweight(0.01)
        edgeArray[9].changeweight(0.01)
        edgeArray[14].changeweight(0.01)
        edgeArray[3].changeweight(0.01)

  }, i*200);
};
}, 4000);
setTimeout(function(){
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[0].changeweight(-0.01)
      edgeArray[15].changeweight(-0.01)

      edgeArray[3].changeweight(0.01)
      edgeArray[12].changeweight(0.01)


}, i*200);
};
}, 8000);

setTimeout(function(){
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[11].changeweight(-0.01)
      edgeArray[14].changeweight(-0.01)

      edgeArray[10].changeweight(0.01)
      edgeArray[15].changeweight(0.01)


}, i*200);
};
}, 12000);

setTimeout(function(){
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[7].changeweight(-0.01)
      edgeArray[14].changeweight(-0.01)
      edgeArray[9].changeweight(-0.01)

      edgeArray[13].changeweight(0.01)
      edgeArray[11].changeweight(0.01)
      edgeArray[6].changeweight(0.01)
}, i*200);
};
}, 16000);

setTimeout(function(){
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[7].changeweight(-0.01)
      edgeArray[12].changeweight(-0.01)
      edgeArray[1].changeweight(-0.01)

      edgeArray[13].changeweight(0.01)
      edgeArray[3].changeweight(0.01)
      edgeArray[4].changeweight(0.01)
}, i*200);
};
}, 20000);

setTimeout(function(){
  for(var i = 0; i < 20 ; i++){
    setTimeout(function(){
      edgeArray[15].changeweight(-0.01)
      edgeArray[5].changeweight(-0.01)

      edgeArray[7].changeweight(0.01)
      edgeArray[13].changeweight(0.01)


}, i*200);
};
}, 24000);

}

function istutorial(){
  return false
}
