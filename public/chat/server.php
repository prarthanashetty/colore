<?php 
header('Content-Type:text/event-stream');
header('Cache-Control: no-cache');
ob_start();
$mod=filemtime("chat2.txt");
while(true)
{	
	if(filemtime("chat2.txt")> $mod )
	{
		$f=file("chat2.txt");
		$d=$f[sizeof($f)-1];
		echo "event:Data\n";
		echo "data:{$d}\n\n";
		ob_flush();
		flush();
		$mod=filemtime("chat2.txt");
		//sleep(2);
		$count+=1;
	}
	clearstatcache();
}
?>
