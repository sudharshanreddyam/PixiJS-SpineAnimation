var app = new PIXI.Application();
document.body.appendChild(app.view);

// load spine data
PIXI.loader
    .add('AVATAR', 'img/ALL_AVATAR_SPINE_03.json')
    .load(onAssetsLoaded);

app.stage.interactive = true;
app.stage.buttonMode = true;
var AVATAR, spineAnimations, spineAnimationIndex = 0;
var seasons = ['SUMMER','WINTER','AUTUMN','SPRING'];
function onAssetsLoaded(loader, res)
{
   AVATAR = new PIXI.spine.Spine(res.AVATAR.spineData);

   spineAnimations = ['Autumn_Idle_02','Autumn_Idle_02','Autumn_Idle_Stand','Autumn_Idle_Win','Spring_Idle_02','Spring_Idle_Stand','Spring_Idle_Win','Summer_Idle_02','Summer_Idle_Stand','Summer_Idle_Win','Winter_Idle_02','Winter_Idle_03','Winter_Idle_Stand','Winter_Idle_Win'];
    
    // set current skin
    AVATAR.skeleton.setSkinByName('SUMMER');
    AVATAR.skeleton.setSlotsToSetupPose();

    // set the position
    AVATAR.x = 200;
    AVATAR.y = 500;

    AVATAR.scale.set(0.5);

    playspine();

    app.stage.addChild(AVATAR);
    
  var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});
  var basicText = new PIXI.Text('Click on the character to change the skin', style);
basicText.x = 350;
basicText.y = 200;

app.stage.addChild(basicText);
  
    AVATAR.state.onComplete = function() {
      spineAnimationIndex = spineAnimationIndex + 1;
      playspine();
    }
  
    app.stage.on('pointertap', function() {
        // change current skin
        var currentSkinName = AVATAR.skeleton.skin.name;
        var newSkinName = (seasons[Math.floor(Math.random() * seasons.length)]);
        AVATAR.skeleton.setSkinByName(newSkinName);
        AVATAR.skeleton.setSlotsToSetupPose();
    });
} 

function playspine(){
  // play animation
    	if(spineAnimationIndex >= spineAnimations.length &&          spineAnimationIndex != 0){
	  spineAnimationIndex = 0;
	}
	if(spineAnimations[spineAnimationIndex] == undefined){
	  spineAnimationIndex = 0;
  }
    AVATAR.state.setAnimation(0, spineAnimations[spineAnimationIndex], false);
}


