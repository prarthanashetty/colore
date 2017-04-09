<?php
	extract($_GET);
	$f=fopen("chat2.txt","a") or die("Unable to open file!");
	fwrite($f,$data."\n");
	fclose($f);
?>

