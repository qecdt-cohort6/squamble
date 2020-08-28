var levelId = "TUT_2"
var isSquambled = false

function mix (){
  isSquambled = true
  for(var i = 0; i < 25 ; i++){
    setTimeout(function(){
      edgeArray[0].changeweight(-0.01)
      edgeArray[2].changeweight(0.01)
      edgeArray[8].changeweight(0.01)
      edgeArray[10].changeweight(-0.01)
}, i*200);

}
}

function istutorial(){
  return true
}

function LevelMessages(){
  return ['Once again, start the level by clicking "squamble". Watching the animation will give you a clue how to play.', 'You have more choices of potential cycles this time.',' Shift + click the nodes you think were involved in this level, then play as before.']
}
