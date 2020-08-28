var levelId = "TUT_1"
var isSquambled = false

function mix (){
  isSquambled = true

  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[0].changeweight(-0.02)
      edgeArray[1].changeweight(0.02)
      edgeArray[2].changeweight(0.02)
      edgeArray[3].changeweight(-0.02)
}, i*200);

}
}
function istutorial(){
  return true
}

function LevelMessages(){
  return ['Why not try pressing "music"?',"If you need to, you can click and drag the nodes to move them around.","What you're seeing right now is the solution... remember this!",'Press "squamble" to initialise the level.', "Notice that the loop from 1 to itself has a negative value. This is bad!", 'Shift + click to select "cycles" of nodes (in this level you should select 0 and 1).', 'Once you\'ve selected them, press "check". This will confirm whether or not it\'s a valid (fully connected) cycle.', 'Now you can scroll to move the "probability" around the cycle. Try to get rid of the negative value.', 'Press "submit" when you\'re happy with the cycle.']
}
