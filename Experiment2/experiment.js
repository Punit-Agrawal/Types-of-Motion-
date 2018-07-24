var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var flr;
var magnet;
var motor;
var fan_base;
var fan_main;
var fan_main_stand;
var fan_wing;
var fan_wing1;
var rf=1;

        var rota=0;             // start at horizontal
        var dire=Math.PI/60;   // 3 degrees change each loop

var fan_wing2;
var fan;
var metalCoil1;
var step=0;
var step1=0;
var step2=0;
var metalCoil2;
var cylinder1;
var cylinder2;
var up1=1;
var line1;
var line2;
var rot;
var rect;
var com=.3;
var p=0.1;
var r=.5;
var arrow = [];
var rarrow = [];
var ar;
var rev;
var m;
var flux;
var ball;
var up=1;
/******************* GUI control objects code ***********************/
var rotorSpeed;
var rotorSpeedDefault; 
var rotorSpeedMin;
var rotorSpeedMax; 
var rotorSpeedStep;
var comSpeed;
var pSpeed;
var rectSpeed;
var exp1;
var exp2;
//var newValue1;
//var newValue2;

function handleRotorSpeed(newValue)
{
    rot = newValue;
    r = rot * 0.8;	
    PIErender();
}

function handlecom(newValue2)
{
    com = newValue2;
    //com = com * 0.8;	
    PIErender();
}
function handlep(newValue3)
{
    p = newValue3;
    //com = com * 0.8;	
    PIErender();
}

function handlerect(newValue1)
{
    rect = newValue1;
   // rect=rect * 0.8;	
    PIErender();
}

function initialiseControlVariables()
{
    rotorSpeed="RotatingSpeed";
	comSpeed="CombinationSpeed";
	rectSpeed="RectilinearSpeed";
	pSpeed="PeriodicSpeed";
	
   // fluxText = 'Flux passing ';
    //emfText = 'Induced emf';
    rotorSpeedDefault=0.5;
    rotorSpeedMin=0;  
    rotorSpeedMax=1; 
    rotorSpeedStep=0.01; 
	rectMax=1;
	rectMin=0;
	comMax=1;
	comMin=0;
	pMax=1;
	pMin=0
	pStep=0.01;
	rectStep=0.01;
	comStep=0.01;
	comDefault=.3;
	pDefault=0.02;
	
	rectDefault=.2;
	 exp2 = "Example 2";
    exp1 = "Example 1";
	exp3="Combination";
	rf=1;
   ball.scale.set(0,0,0);
    fan.scale.set(1, 1, 1);
	hill.scale.set(1,1,1);
	g2.scale.set(1,1,1);
	rect1.scale.set(1,1,1);
	pulley.scale.set(0,0,0);
	rect2.scale.set(0,0,0);
	per1.scale.set(1,1,1);
	per2.scale.set(0,0,0);
	comb.scale.set(0,0,0);
	comb1.scale.set(0,0,0); 
	par.scale.set(1,1,1);
	//gv.scale.set(0,0,0);
//PIEremoveElement(gv);
	//PIEremoveElement(gv);
	//PIEremoveElement(gv);
	up=1;
	 up1=1;
}
var flag=0;
function EXP1() {
    flag = 0;
    ball.scale.set(0,0,0);
    fan.scale.set(1,1,1);
	hill.scale.set(1,1,1);
	rect1.scale.set(1,1,1);
	pulley.scale.set(0,0,0);
	g2.scale.set(1,1,1);
	rect2.scale.set(0,0,0);
	per2.scale.set(0,0,0);
	per1.scale.set(1,1,1);
	comb.scale.set(0,0,0);
	comb1.scale.set(0,0,0); 
	par.scale.set(1,1,1);
	//gv.scale.set(0,0,0);
	
	PIEremoveElement(gv);
	
	//PIEremoveElement(gv);
	
    PIErender();
    PIEchangeInputCheckbox(exp2, false);
    PIEchangeInputCheckbox(exp3, false);
    PIEchangeInputCheckbox(exp1, true);
}
function EXP2() {
    flag = 1;
 ball.scale.set(1,1,1);
    fan.scale.set(0,0,0);
	hill.scale.set(0,0,0);
	rect1.scale.set(0,0,0);
	pulley.scale.set(1,1,1);
	rect2.scale.set(1,1,1);
	per2.scale.set(1,1,1);
	 g2.scale.set(0,0,0);
	par.scale.set(1,1,1);
	per1.scale.set(0,0,0);
	comb.scale.set(0,0,0);
	comb1.scale.set(0,0,0);
	PIEremoveElement(gv);
	//gv.scale.set(0,0,0);
    PIErender();
    PIEchangeInputCheckbox(exp1, false);
    PIEchangeInputCheckbox(exp2, true);
    PIEchangeInputCheckbox(exp3, false);
}

function EXP3() {
    flag = 1;
   ball.scale.set(0,0,0);//(0);
    fan.scale.set(0, 0, 0);
	hill.scale.set(0,0,0);//(1,1,1);
	rect1.scale.set(0,0,0);//(1,1,1);
	pulley.scale.set(0,0,0); 
	par.scale.set(0,0,0);
	rect2.scale.set(0,0,0);
	g2.scale.set(0,0,0);
	per2.scale.set(0,0,0);
	comb.scale.set(1,1,1);
	comb1.scale.set(1,1,1);
	per1.scale.set(0,0,0);
	
	PIEaddElement(gv);
    PIErender();
    PIEchangeInputCheckbox(exp1, false);
    PIEchangeInputCheckbox(exp2, false);
	
    PIEchangeInputCheckbox(exp3,true);
}	
function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
	PIEaddInputSlider(rectSpeed,rectDefault,handlerect, rectMin,rectMax, rectStep);
    PIEaddInputSlider(comSpeed,comDefault,handlecom, comMin,comMax, comStep);
    PIEaddInputSlider(pSpeed,pDefault,handlep, pMin,pMax, pStep);
    
    PIEaddInputSlider(rotorSpeed,rotorSpeedDefault,handleRotorSpeed, rotorSpeedMin,rotorSpeedMax, rotorSpeedStep);
     PIEaddInputCheckbox(exp1, true, EXP1);
    PIEaddInputCheckbox(exp2, false, EXP2);
	PIEaddInputCheckbox(exp3, false, EXP3);
	PIEaddDisplayText(rectSpeed,rectDefault);
	PIEaddDisplayText(comSpeed,comDefault);
	PIEaddDisplayText(pSpeed,pDefault);
	
	PIEaddDisplayText(rotorSpeed,rotorSpeedDefault);
	PIEpauseAnimation();
	PIEresetExperiment();
	PIEresumeAnimation();
	PIEslowdownAnimation();
	PIEspeedupAnimation();
	PIEstartAnimation();
	PIEstopAnimation();
	PIEupdateHelp(helpContent);
	PIEupdateInfo(infoContent);
   // PIEaddDisplayText(fluxText,flux);
   // PIEaddDisplayText(emfText,emf);
}
var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Types of Motion Help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment describes the types of Motion in our day to day life. </p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There three check box and one slider to change the rotating speed.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to one slider.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>rotation Speed &nbsp;&nbsp;:&nbsp;Controls the speed at which rotation is performed.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, The rotation will be based on spped selected. </p>";
    helpContent = helpContent + "<p>The right hand panel now shows the Rotating speed value during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Rotation Speed &nbsp;&nbsp;:&nbsp;Shows the speed of Rotation";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
     helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Types of Motion </h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment explains different types of Motion .</p>";
    infoContent = infoContent + "<h3>Working</h3>";
    infoContent = infoContent + "<p>Shows three coloumns describe differnt types of Motion.</p>";
    infoContent = infoContent + "<p>And the combination will show combination of all the motion</p>";
    infoContent = infoContent + "<h3>Increase in rotation  speed increases the rotation of Fan and Ball Bearing.</h3>";
    infoContent = infoContent + "<p>First coloumns : shows the rectilinear Motion. Two examples are:<br>a. Car climbing a hill.<br>a. A box pulled by rope.<br><br>Second Column shows the Circular Motion. Examples are:<br>a. Fan<br>b. Ball Bearing<br><br>Third Column shows the Periodic Motion. Examples are:<br>a. Planet Rotating around sun.<br><br>b. Clock<br> </p>";
	infoContent = infoContent + "<p><br> Combination motion  shows : <br><br> A cricket ball performing rectilinear motion ,circular motion and periodic motion. 	</p>";
    infoContent = infoContent + "<h4>Cofficient of restitution is equal to 1 in this case.( e = 1 )</h4>";
   
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
	pMax=1;
	pMin=0;
	pStep=0.01;
	rectMax=1;
	rectMin=0;
	comMax=1;
	comMin=0;
	rectStep=0.01;
	comStep=0.01;
	comDefault=1;
	rectDefault=1;
	PIEcamera.position.set(0,0,600);
    /* Initialise Scene Variables */
   /* mySceneTLX =-200.0;
    mySceneTLY = 125.0;
    mySceneBRX = 200.0;
    mySceneBRY = -125.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
	PIEcamera.position.set(0,0,500);
PIEturnCamera(60,0,0);
	   */
	//texture = new THREE.TextureLoader().load( 'scene.png' );
/*
PIEadjustCamera(0,0,0);
PIEturnCamera(60,0,0);
PIEsetCameraFOV(0);*/
}

function initialiseOtherVariables()
{    rot = 0.5;
     r = rot * 0.8 ;
     ar = 1;
     rev = true;  
	 
    rect = .3;
    com = .3;
	p=.1;
}
function loadExperimentElements()
{
 PIEsetAreaOfInterest(-150,10,150,-10);

    PIEappendHelp(helpContent);
	
   PIEappendInfo(infoContent);
	PIEsetExperimentTitle("Types of Motion");
    PIEsetDeveloperName("Punit Agrawal");
    PIEhideControlElement();
    // PIEresetButton.addEventListener("click", PIEpauseAnimation);

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

    
 
PIErenderer.setClearColor(0x154368);

var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(40, 0);
shape.lineTo(40, 0.00001);

var options = {
  amount: 0.0001,
  bevelThickness: 0.000001,
  bevelSize: 0.00001,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1
};
var material1 = new THREE.MeshPhongMaterial({
  wireframe: true,
  color : 0xBA4A00
});
var material2 = new THREE.MeshPhongMaterial({
  wireframe: true,
  color : 0x3498DB
});
var shapeGeo = new THREE.ExtrudeGeometry(shape, options);
var material = new THREE.MeshPhongMaterial({
  wireframe: true,
  color : 0xffff00
});
fan = new THREE.Group();
fan_base = new THREE.Mesh(new THREE.BoxGeometry(40,40,5),material2);
fan_base.position.set(0, -30, 90);
fan_base.rotation.x += Math.PI/2;
fan.add(fan_base);
fan_main = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 1, 32), material1);
fan_main.position.set(0, 20, 90);
fan_main.rotation.z += Math.PI/2;
fan.add(fan_main);
fan_main_stand = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 50, 32), material1);
fan_main_stand.position.set(0, -5, 90);

fan.add(fan_main_stand);
var fan_geo = new THREE.BoxGeometry(1,26,14);
fan_geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0,13, 0 ) );
fan_wing = new THREE.Mesh(fan_geo,material);
fan_wing.position.set(0,20,90);
fan.add(fan_wing);
fan_wing1 = new THREE.Mesh(fan_geo,material);
fan_wing1.position.set(0,20,90);
fan_wing1.rotation.x +=2.094;
fan.add(fan_wing1);
fan_wing2 = new THREE.Mesh(fan_geo,material);
fan_wing2.position.set(0,20,90);
fan_wing2.rotation.x += 4.189;
fan.add(fan_wing2);
PIEaddElement(fan);
fan.position.z += 305;

fan.position.x -=90;
fan.rotation.y += 121;
 
 
 
per1=new THREE.Group();

 geometry = new THREE.CircleGeometry(15.2, 132);
// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,0, 0 ) );


    p1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xFFFF00, opacity: 0.5 })); // 0xfcf0b6
    p1.position.set(130, 20, 0.5);
    PIEaddElement(p1);
    p1.castShadow = false;
    p1.receiveShadow = true;

	 geometry = new THREE.CircleGeometry(5.2, 132);

 p2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xFF0000, opacity: 0.5 })); // 0xfcf0b6
    p2.position.set(130, 30, 0.9);
    PIEaddElement(p2);
    p2.castShadow = false;
    p2.receiveShadow = true;
	
	
		 geometry = new THREE.CircleGeometry(7, 132);
    p3 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00FF00, opacity: 0.5 })); // 0xfcf0b6
    p3.position.set(130, 50, 0.9);
    PIEaddElement(p3);
    p3.castShadow = false;
    p3.receiveShadow = false;

	
	geometry = new THREE.CircleGeometry(9.5, 132);
p4 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x00FFFF, opacity: 0.5 })); // 0xfcf0b6
    p4.position.set(130, 80, 0.9);
    PIEaddElement(p4);
    p4.castShadow = false;
    p4.receiveShadow = false;

	


per1.add(p1);
per1.add(p2);
per1.add(p3);
per1.add(p4);

 PIEaddElement(per1);


 
par=new THREE.Group();

	geometry = new THREE.CylinderGeometry(0.7,0.7, 448);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,24, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    par1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xFFFFFF, opacity: 0.5 })); // 0xfcf0b6
    par1.position.set(-60, 0, 0);
	par1.rotateZ(Math.PI / 120); 

    PIEaddElement(par1);
 	geometry = new THREE.CylinderGeometry(0.7,0.7, 448);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,24, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    par2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xFFFFFF, opacity: 0.5 })); // 0xfcf0b6
    par2.position.set(60, 0, 0);
	//par2.rotateZ(Math.PI / 120); 

    PIEaddElement(par2);
 
 
par.add(par1);
par.add(par2);
 
  PIEaddElement(par);

 
 
 
 
 
 
 

per2=new THREE.Group();

 geometry = new THREE.CircleGeometry(40.2, 132);

  texture = new THREE.TextureLoader().load( 'clock.gif' );
				geo = new THREE.CircleBufferGeometry( 70, 70, 110 );
				 mat = new THREE.MeshBasicMaterial( { map: texture } );
				mesh = new THREE.Mesh( geo, mat );
				 mesh.position.set(132, 0, 10);
         // mesh.rotateY(Math.PI/2.5);
				PIEaddElement( mesh );
 
	
	geometry = new THREE.CylinderGeometry(0.7,0.7, 40);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,20, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    rod = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5 })); // 0xfcf0b6
    rod.position.set(117, 2.5, 80);

    PIEaddElement(rod);

	
	geometry = new THREE.CircleGeometry(2,190);
	 rod2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5 })); // 0xfcf0b6
    rod2.position.set(117, 2.5, 80);

    PIEaddElement(rod2);


	
		geometry = new THREE.CylinderGeometry(0.7,0.7, 32);
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,16, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    rod1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5 })); // 0xfcf0b6
    rod1.position.set(117, 2.5, 80);

    PIEaddElement(rod1);


per2.add(rod);
per2.add(mesh);
per2.add(rod1);

per2.add(rod2);
PIEaddElement(per2);









	texture = new THREE.TextureLoader().load( 'g1.png' );
				geo = new THREE.PlaneBufferGeometry( 40,40 );
				 mat = new THREE.MeshBasicMaterial( { map: texture } );
				g2 = new THREE.Mesh( geo, mat );
				 g2.position.set(-150, 80, -10);
        
				PIEaddElement( g2 );
				

 


rect1 = new THREE.Group();
texture = new THREE.TextureLoader().load( 'container.png' );


geometry = new THREE.PlaneGeometry(25.7, 30);
    plane = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ opacity: 0.5 ,map: texture})); // 0xfcf0b6
    plane.position.set(-154, -10, 0);
plane.rotation.z=-Math.PI/9;
    PIEaddElement(plane);
	
	
	texture = new THREE.TextureLoader().load( 'pulley.png' );

geometry = new THREE.CircleGeometry(2.7, 20);
    w1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5,map: texture })); // 0xfcf0b6
    w1.position.set(-143, -25, 0);

    PIEaddElement(w1);
	
geometry = new THREE.CircleGeometry(2.7, 20);
    w2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5,map: texture })); // 0xfcf0b6
    w2.position.set(-138, -10, 0);

    PIEaddElement(w2);
	//rect1.add(g2);
rect1.add(plane);
rect1.add(w1);
rect1.add(w2);
//rect1.add(m2);
 PIEaddElement(rect1);
	

texture = new THREE.TextureLoader().load( 'pulley.png' );

geometry = new THREE.CircleGeometry(20.7, 20);
    pulley = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x5499C7, opacity: 0.5,map: texture })); // 0xfcf0b6
    pulley.position.set(-125, 155, 0);

    PIEaddElement(pulley);
	

rect2 = new THREE.Group();


  texture = new THREE.TextureLoader().load( 'box.png' );


geometry = new THREE.PlaneGeometry(30.7, 40);
    lift = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xD35400, opacity: 0.5, map: texture })); // 0xfcf0b6
    lift.position.set(-105, -20, 2);
//plane.rotation.z=-Math.PI/5;
    PIEaddElement(lift);
	texture1 = new THREE.TextureLoader().load( 'rope3.png' );

	
	  texture1.wrapS = THREE.RepeatWrapping;
        texture1.wrapT = THREE.RepeatWrapping;
      texture1.repeat.set( 1,10);

geometry = new THREE.PlaneGeometry(5.5, 200);
    s1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ opacity: 0,map: texture1 })); // 0xfcf0b6
    s1.position.set(-105, 66, 0);

    PIEaddElement(s1);
	
geometry = new THREE.PlaneGeometry(5.5, 400);
    s2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({  opacity: 0.5 ,map: texture1})); // 0xfcf0b6
    s2.position.set(-145, 225, 0);

    PIEaddElement(s2);
		 texture = new THREE.TextureLoader().load( 'hand.png' );
				geo = new THREE.PlaneBufferGeometry( 40,40 );
				 mat = new THREE.MeshBasicMaterial( { map: texture } );
				m = new THREE.Mesh( geo, mat );
				 m.position.set(-140, 40, 50);
        
				PIEaddElement( m );
				
 
rect2.add(lift);
rect2.add(s1);
rect2.add(s2);
rect2.add(m);
//rect2.add(m2);
 PIEaddElement(rect2);
	
	
	
	
	
	
	
	geometry = new THREE.CylinderGeometry(0.7,70, 400);
    hill = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x6E2C00, opacity: 0.5 })); // 0xfcf0b6
    hill.position.set(-95, 20-20, 0.3);
hill.rotation.z=-Math.PI/21.5;
hill.receiveShadow = false;
    PIEaddElement(hill);
	
	
	

comb1 = new THREE.Group();
	
texture = new THREE.TextureLoader().load( 'wall.png' );
	

				geometry = new THREE.PlaneGeometry(520, 250);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,16, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    r1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({  opacity: 0.5, map: texture })); // 0xfcf0b6
    r1.position.set(455, -10, 0);
	r1.rotateZ(-Math.PI / 100); 

    PIEaddElement(r1);
	
				geometry = new THREE.PlaneGeometry(1020, 250);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,16, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    r3 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ opacity: 0.5 , map: texture})); // 0xfcf0b6
    r3.position.set(10, -240, 0);
	//r3.rotateZ(-Math.PI / 2); 

    PIEaddElement(r3);



		geometry = new THREE.PlaneGeometry(520, 250);
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0,16, 0 ) );
	//geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cylinderHeight/2, 0 ) );
    r2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({  opacity: 0.5, map: texture })); // 0xfcf0b6
    r2.position.set(-398, -10, -1);
	r2.rotateZ(Math.PI / 180); 

    PIEaddElement(r2);
	
	texture = new THREE.TextureLoader().load( 'g1.png' );
				geo = new THREE.PlaneBufferGeometry( 70,70 );
				 mat = new THREE.MeshBasicMaterial( { map: texture } );
				g = new THREE.Mesh( geo, mat );
				 g.position.set(130, 80, -10);
        
				PIEaddElement( g );
				
	
	comb1.add(g);
	comb1.add(r1);
	comb1.add(r2);
	comb1.add(r3);

PIEaddElement(comb1);


	
comb = new THREE.Group();

  texture = new THREE.TextureLoader().load( 'ball.png' );
				geo = new THREE.CircleBufferGeometry( 18,300,300 );
				 mat = new THREE.MeshBasicMaterial( { map: texture } );
				m1 = new THREE.Mesh( geo, mat );
				 m1.position.set(0, 28, 0);
        //  m1.rotateX(Math.PI/2.2);
		  //mesh.rotateY(Math.PI/3);
				PIEaddElement( m1 );
 
comb.add(m1);
PIEaddElement(comb);

ball = new THREE.Group();

texture = new THREE.TextureLoader().load( 'steel.png' );

 geometry = new THREE.CircleGeometry(50.2, 132);
    disappear = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5 })); // 0xfcf0b6
    disappear.position.set(0, 20-20, 0.5);
    PIEaddElement(disappear);
    disappear.castShadow = false;
    disappear.receiveShadow = false;
   
 geometry = new THREE.CircleGeometry(20.2, 132);
    disappear1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear1.position.set(0, 20-20, 0.5);
    PIEaddElement(disappear1);
    disappear1.castShadow = false;
    disappear1.receiveShadow = true;

	 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear2.position.set(0, 55-20, 0.9);
    PIEaddElement(disappear2);
    disappear2.castShadow = false;
    disappear2.receiveShadow = true;
	
	
		 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear3 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear3.position.set(27, 42-20, 0.9);
    PIEaddElement(disappear3);
    disappear3.castShadow = false;
    disappear3.receiveShadow = false;

	
		 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear4 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5 ,map: texture})); // 0xfcf0b6
    disappear4.position.set(34, 12.5-20, 0.9);
    PIEaddElement(disappear4);
    disappear4.castShadow = false;
    disappear4.receiveShadow = false;

	
		 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear5 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5 ,map: texture})); // 0xfcf0b6
    disappear5.position.set(-27, 42-20, 0.9);
    PIEaddElement(disappear5);
    disappear5.castShadow = false;
    disappear5.receiveShadow = false;

	
		 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear6 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5 ,map: texture})); // 0xfcf0b6
    disappear6.position.set(-34, 12.5-20, 0.9);
    PIEaddElement(disappear6);
    disappear6.castShadow = false;
    disappear6.receiveShadow = false;

		 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear7 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear7.position.set(15.25, -11.5-20, 0.9);
    PIEaddElement(disappear7);
    disappear7.castShadow = false;
    disappear7.receiveShadow = false;

			 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear8 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear8.position.set(-15.25, -11.5-20, 0.9);
    PIEaddElement(disappear8);
    disappear8.castShadow = false;
    disappear8.receiveShadow = false;

				 geometry = new THREE.CircleGeometry(55.2, 132);
    disappear9 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x808B96, opacity: 0.5 ,map: texture})); // 0xfcf0b6
    disappear9.position.set(0, 20-20, 0);
    PIEaddElement(disappear9);
    disappear9.castShadow = false;
    disappear9.receiveShadow = false;

				 geometry = new THREE.CircleGeometry(15.2, 132);
    disappear10 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 0.5,map: texture })); // 0xfcf0b6
    disappear10.position.set(0, 20-20, 0.8);
    PIEaddElement(disappear10);
    disappear10.castShadow = false;
    disappear10.receiveShadow = false;
ball.add(disappear);
ball.add(disappear1);

ball.add(disappear2);


ball.add(disappear3);
ball.add(disappear4);
ball.add(disappear5);
ball.add(disappear6);
ball.add(disappear7);
ball.add(disappear8);
ball.add(disappear9);
ball.add(disappear10);
PIEaddElement(ball);

ball.position.y -= 20;


 loader = new THREE.FontLoader();
    loader.load("optimer.json", function(response){
		font = response;
       geometry = new THREE.TextGeometry("Circular Motion", {
            font : font,
            size : 5,
            height : 0,
        });
		        gval=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
        gval.translation = geometry.center();
PIEaddElement(gval);       
	   gval.position.set(6.5, -107, 100);
	    geometry = new THREE.TextGeometry("Periodic Motion", {
            font : font,
            size : 5,
            height : 0,
        });
		
 		        gval=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
        gval.translation = geometry.center();
PIEaddElement(gval);       
	   gval.position.set(100.5, -107, 100);
	    geometry = new THREE.TextGeometry("Rectilinear Motion", {
            font : font,
            size : 5,
            height : 0,
        });
		
 		        gval=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
        gval.translation = geometry.center();
PIEaddElement(gval);       
	   gval.position.set(-100.5, -107, 100);
	   
	    geometry = new THREE.TextGeometry("e=1", {
            font : font,
            size : 10,
            height : 0,
        });
		
 		        gv=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
        gv.translation = geometry.center();
//PIEaddElement(gv);       
	   gv.position.set(170.5, 97, -10);
 
});
   
    initialiseControls();
    resetExperiment();

}

function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();
	
	//flag=0;
}

function updateExperimentElements(t, dt)
{
	
	
fan_wing2.rotation.x -= r;
fan_wing1.rotation.x -= r;
fan_wing.rotation.x -= r;

ball.rotation.z -=r;
//fan.rotation.x -=r;
if(lift.position.y<=70&&up==1){
lift.position.y+=rect;
m.position.y-=rect;
s1.position.y+=rect;
s2.position.y-=rect;}
if(lift.position.y>70){
up=0;}
if(lift.position.y>=-20&&up==0){
lift.position.y-=rect;
m.position.y+=rect;

				
s1.position.y-=rect;
s2.position.y+=rect;}
if(lift.position.y<-20){
up=1;}	



if(rect1.position.y<=125&&up1==1){
rect1.position.y+=(.3*rect*5);
rect1.position.x+=(.1*rect*5);
}
if(rect1.position.y>125){
up1=0;}
if(rect1.position.y>=-75&&up1==0){
rect1.position.y-=(.3*rect*5);
rect1.position.x-=(.1*rect*5);
}
if(rect1.position.y<=-75){
up1=1;}	
ball.rotation.z -=r;
p2.rotation.z -=p;
p3.rotation.z -=p;
p4.rotation.z -=p;
step+=p;
  p2.position.x = 130 + ( 25 * (Math.cos(step)));
            p2.position.y = 20 + ( 25 * (Math.sin(step)));
step1+=p/2;
  p3.position.x = 130 + ( 40 * (Math.cos(step1)));
            p3.position.y = 20 + ( 40 * (Math.sin(step1)));
step2+=p/6;
  p4.position.x = 130 + ( 60 * (Math.cos(step2)));
            p4.position.y = 20 + ( 60* (Math.sin(step2)));
		
		rod.rotation.z-=p;
            rod1.rotation.z-=(p/12);

		  comb.position.y = -128 + ( 225 *Math.abs(Math.cos(-step2)));
			if(comb.position.x<=177&&rf==1)
			comb.position.x+=com;
			if(comb.position.x>177)
			rf=0;
		if(comb.position.x>=-120&&rf==0)
			comb.position.x-=com;
			if(comb.position.x<-120)
			rf=1;		
			m1.rotation.z-=(com*.4);
           //.rotation.z+=.15;
           
  PIEchangeDisplayText(rotorSpeed,rot);
  PIEchangeDisplayText(rectSpeed,rect);
  PIEchangeDisplayText(comSpeed,com);
  
  PIEchangeDisplayText(pSpeed,p);
}
