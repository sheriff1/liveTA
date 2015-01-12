<?php
	session_start();
	require_once("../YAPM/projutils.php");
	// The user must be logged in behond this call..
	userMustLogin("untitled.php");
	
	$dbh = connectDB();
	$logger = startLogger('untitled.php>>');
	
	$user['username'] = ucfirst($_SESSION['username']);

	$stmt = $dbh->prepare("SELECT * FROM `aors`
		WHERE uid=:uid;");
	if(!$stmt) $logger->error($dbh->errorInfo());
	$stmt->execute(array(':uid'=> $_SESSION['uid']));
	if(!$stmt) $logger->error($dbh->errorInfo());
	$logger->info("User AORs selected successfully\n");
	$aors =  $stmt->fetchAll(PDO::FETCH_ASSOC);

	for ($i=0; $i < sizeof($aors); $i++) { 
		if($aors[$i]['color']==0){
			$user['blueAorLabel'] = $aors[$i]['aorName'];
		}
		else if($aors[$i]['color']==1){
			$user['redAorLabel'] = $aors[$i]['aorName'];
		}
		else if($aors[$i]['color']==2){
			$user['greenAorLabel'] = $aors[$i]['aorName'];
		}
		else if($aors[$i]['color']==3){
			$user['yellowAorLabel'] = $aors[$i]['aorName'];
		}
		else if($aors[$i]['color']==4){
			$user['orangeAorLabel'] = $aors[$i]['aorName'];
		}
		else{
			$user['purpleAorLabel'] = $aors[$i]['aorName'];
		}
	}

	echo gen_template("views/untitled.tmpl", $user);
	//debugging:
	//print_r($user);
?>