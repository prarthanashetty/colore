<?php
	extract($_GET);
	$f=fopen("chat1.txt","a") or die("Unable to open file!");
	fwrite($f,$data."\n");
	fclose($f);
?>

