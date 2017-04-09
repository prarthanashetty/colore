<?php 
header('Content-Type:text/event-stream');
header('Cache-Control: no-cache');
ob_start();
$mod=filemtime("chat1.txt");
while(true)
{	
	if(filemtime("chat1.txt")> $mod )
	{
		$f=file("chat1.txt");
		$d=$f[sizeof($f)-1];
		echo "event:Data\n";
		echo "data:{$d}\n\n";
		ob_flush();
		flush();
		$mod=filemtime("chat1.txt");
		//sleep(2);
		$count+=1;
	}
	clearstatcache();
}
?>
