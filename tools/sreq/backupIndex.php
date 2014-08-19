<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>System Requirements Checker</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="css/custom.css" rel="stylesheet" media="screen">
		<script src="Flash_detect.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	</head>
	<body>
	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>
		<div class="page">
			<div class="header">
				<img src="img/kerboodle-header.png" alt="kerboodle logo">
			</div>

			<h1>System Requirments Check</h1>

			<p>Lorem ipsum dolor sit amet consectetur adi pisicing elit sed do eiusmod tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer citation ull amco laboris nisi ut aliquip ex ea commodo consequat elit sed do.</p>



			<h4>Minimum requirements</h4>

			<table class="table table-condensed">
				<tbody>
					<tr id="b1" class="error">
						<td><strong>Browser</strong></td>
						<td id="b2"></td>
						<td id="b3"><i class="icon-remove"></i></td>
					</tr>
					<tr id="os1" class="error">
						<td><strong>Operating System</strong></td>
						<td id="os2"></td>
						<td id="os3"><i class="icon-remove"></i></td>
					</tr>

					<tr id="j1" class="error"> 
						<td><strong>Javascript</strong></td>
						<td id="j2">Disabled</td>
						<td id="j3"><i class="icon-remove"></i></td>
					</tr>

					<tr id="f1" class="error">
						<td><strong>Adobe Flash Player</strong></td>
						<td id="f2"></td> 
						<td id="f3"><i class="icon-remove"></i></td>
					</tr>
								
					<tr id="a1" class="error">
						<td><strong>Adobe Acrobat Reader </strong></td>
						<td id="a2"></td>
						<td id="a3"><i class="icon-remove"></i></td>
					</tr>

					<tr id="s1" class="error">
						<td><strong>Screen Resolution </strong></td>
						<td id="s2"></td>
						<td id="s3"><i class="icon-remove"></i></td>
					</tr>
					<tr class="success">
						<td><strong>Browser Window Size </strong></td>
						<td id="td6"></td>
						<td><i class="icon-ok"></i></td>
					</tr>

				</tbody>

			</table>

				<div class="row-fluid span8 ">

				<div class="span4 offset8 ">

				
			
<a href="" onclick="sendMail(); return false"><i class="icon-envelope"></i> Email us your results</a> 
			
				</div>
				</div>
			</div>
<script type="text/javascript">
//********************javascript detect**********************
document.getElementById('j2').innerHTML = '<strong>Enabled</strong>';
document.getElementById('j1').className = 'success';
document.getElementById('j3').innerHTML = '<i class="icon-ok"></i>'

//*********************operating system detect******************
</script>
<?php
$uagent = $_SERVER['HTTP_USER_AGENT'] . "<br/>";
$PassVar = 0;
$TextPHP;
$OSGood = false;
function os_info($uagent)
{
    // the order of this array is important
    
    global $uagent;
    $oses   = array(
        'Win311' => 'Win16',
        'Win95' => '(Windows 95)|(Win95)|(Windows_95)',
        'WinME' => '(Windows 98)|(Win 9x 4.90)|(Windows ME)',
        'Win98' => '(Windows 98)|(Win98)',
        'Win2000' => '(Windows NT 5.0)|(Windows 2000)',
        'WinXP' => '(Windows NT 5.1)|(Windows XP)',
        'WinServer2003' => '(Windows NT 5.2)',
        'WinVista' => '(Windows NT 6.0)',
        'Windows 7' => '(Windows NT 6.1)',
        'Windows 8' => '(Windows NT 6.2)|(Windows NT 6.3)',
        'WinNT' => '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
        'OpenBSD' => 'OpenBSD',
        'SunOS' => 'SunOS',
        'Ubuntu' => 'Ubuntu',
        'Android' => 'Android',
        'Linux' => '(Linux)|(X11)',
        'iPhone' => 'iPhone',
        'iPad' => 'iPad',
        'MacOS' => '(Mac_PowerPC)|(Macintosh)',
        'QNX' => 'QNX',
        'BeOS' => 'BeOS',
        'OS2' => 'OS/2',
        'SearchBot' => '(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves/Teoma)|(ia_archiver)'
    );
    $uagent = strtolower($uagent ? $uagent : $_SERVER['HTTP_USER_AGENT']);
     foreach ($oses as $os => $pattern)
        if (preg_match('/' . $pattern . '/i', $uagent))
            return $os;
    return 'Unknown';
}
$TextOut = os_info( $uagent );
switch ($TextOut)
{
	case 'iPad':
		// make this work so it shows the version number
		//$version = preg_replace("/(.*) OS ([0-9]*)_(.*)/","$2", $_SERVER['HTTP_USER_AGENT']);
		$version = preg_replace("/(.*) OS ([0-9].[0-9]*)_(.*)/","$2", $_SERVER['HTTP_USER_AGENT']);
		$version = preg_replace("/_/",".", $version);
		//echo "<br>Version: " .  $version ;
		//echo  "<br>String: " . $_SERVER['HTTP_USER_AGENT'];
		$TextOut =  os_info( $uagent ). " " . $version;
		$TextPHP = $TextOut;
		$VtoFloat = (float) $version;
		if ($VtoFloat >= 6.1 )
		{
			$TextOut = "<strong>" . os_info( $uagent ). " " . $version . "</strong>";
			$OSGood = true;
		} else {		
			$TextOut = os_info( $uagent ). " " . $version;
		}
	break;
	case 'Android': 
	// make this work so it shows the version number
		 	
		preg_match('/Android (\d+(?:\.\d+)+)[;)]/', $_SERVER['HTTP_USER_AGENT'], $matches);
		$version = $matches[1];
		$versionSplit = split("/.",$version);
		$TextOut = os_info( $uagent ). " " . $version;
		$TextPHP = $TextOut;
		$PassVar = 1;
		if ($versionSplit[0] > 3)
		{
			$TextOut = "<strong>" . os_info( $uagent ). " " . $version . "</strong>";		
			$OSGood = true;
		} else {
			if ($versionSplit[0] = 3)
			{
				if ($versionSplit[1] >= 2 )
				{
					$TextOut = "<strong>" . os_info( $uagent ). " " . $version . "</strong>";
					$OSGood = true;
				} 		
			}		
		}
	break;
	case 'WinXP': 
	case 'WinVista': 
	case 'Windows 7': 
	case 'Windows 8': 	
		$TextOut = "<strong>" . os_info( $uagent ). "</strong>";
		$OSGood = true;
		$TextPHP = os_info( $uagent );
	break;
	case 'MacOS':
		 preg_match('/Intel Mac OS X (\d)+(_)+(\d)+(_)+(\d)/', $_SERVER['HTTP_USER_AGENT'], $matches);
		$version = $matches[0];
		preg_match('/(\d)+(_)+(\d)+(_)+(\d)/', $version, $NumOnly);
		$Verparts = split("_", $NumOnly[0]);
		if ($Verparts[0] > 9 )
		{ if ($Verparts[1] > 3 )
			$OS = "Mac OS ";
			switch ($Verparts[1])
			{
			case 4:
				$version = "10.4 Tiger"; 
			break;
			case 5:
				$version = "10.5 Leopard"; 
			break;
			case 6:
				$version = "10.6 Snow Leopard"; 
			break;
			case 7:
				$version = "10.7 Lion"; 
			break;
			case 8:
				$version = "10.8 Mountain Lion"; 
			break;
			case 7:
				$version = "10.9 Mavericks"; 
			break;			
			}	
			{$TextOut = "<strong>" . $OS . $version . "</strong>";
			$OSGood = true;
			$TextPHP = $OS . $version;
			}
		}
		
	// does this need to show the software number i.s. OS X.5
		
	break;
}

//echo "<br> " . $TextOut;

?>
<script type="text/javascript">
var OSOK = <?php echo json_encode($OSGood);?>;
var OutPHP = <?php echo json_encode($TextOut);?>;
//document.writeln("<br> output: " + OutPHP);
document.getElementById('os2').innerHTML = OutPHP;
if(OSOK) {
document.getElementById('os1').className = 'success';
document.getElementById('os3').innerHTML = '<i class="icon-ok"></i>'
}
//************************Browser Detect section *********************
function get_browser(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[0];
    }
    
function get_version(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[1];
    }
var browser = get_browser();
var browser_version = get_version();
var BVerInt = parseInt(browser_version);
var text1 = browser + " " + browser_version;
var Brout = text1;
var OKtest = false;
switch (browser)
{
	case "Netscape":
		browser = "Internet Explorer";
		browser_version = "11";
		text1 = browser + " " + browser_version;
		Brout = text1;
	break;
	case "MSIE":
		browser = "Internet Explorer";
		text1 = browser + " " + browser_version;
		Brout = text1;
		if (BVerInt >= 9)
		{ text1 = "<strong>" + browser + " " + browser_version + "</strong>";
		  OKtest = true;
		}	
	break;
	case "Firefox":
		if(BVerInt >= 8)
		{text1 = "<strong>" + browser + " " + browser_version + "</strong>";
		 OKtest = true;
		} 		
	break;
	case "Chrome":
		if(BVerInt >= 15)
		{text1 = "<strong>" + browser + " " + browser_version + "</strong>";
		 OKtest = true;
		}
	break;
	case "Safari":
		FromPHP = <?echo $PassVar?>;
		if(FromPHP == 1)
		{text1 = "Android Browser";
		Brout = text1;
		}
		if(BVerInt >= 5)
		{text1 = "<strong>" + browser + " " + browser_version + "</strong>";
		 OKtest = true;
		}
		//pick up version number, from after /version
		if(BVerInt >= 9)
		{text1 = "<strong>" + browser + " 7</strong>";
		Brout = text1 + " 7";
		 OKtest = true;
		}
	break;
}

document.getElementById('b2').innerHTML = text1;
if(OKtest) {
document.getElementById('b1').className = 'success';
document.getElementById('b3').innerHTML = '<i class="icon-ok"></i>'
}
// **************acrobat and flash detect section ************
//document.writeln(text1);

var getAcrobatInfo = function() { 
var getBrowserName = function() {
return this.name = this.name || function() {
var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
 
if(userAgent.indexOf("chrome") > -1) return "chrome";
else if(userAgent.indexOf("safari") > -1) return "safari";
else if(userAgent.indexOf("msie") > -1) return "ie";
else if(userAgent.indexOf("firefox") > -1) return "firefox";
return userAgent;
}();
};
 
var getActiveXObject = function(name) {
try { return new ActiveXObject(name); } catch(e) {}
};
 
var getNavigatorPlugin = function(name) {
for(key in navigator.plugins) {
var plugin = navigator.plugins[key];
if(plugin.name == name) return plugin;
}
};
 
var getPDFPlugin = function() {
return this.plugin = this.plugin || function() {
if(getBrowserName() == 'ie') {

return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
}
else {
return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
}
}();
};
 
var isAcrobatInstalled = function() {
return !!getPDFPlugin();
};
 
var getAcrobatVersion = function() {
try {
var plugin = getPDFPlugin();
 
if(getBrowserName() == 'ie') {
var versions = plugin.GetVersions().split(',');
var latest = versions[0].split('=');
return parseFloat(latest[1]);
}
 
if(plugin.version) return parseInt(plugin.version);
return plugin.name
}
catch(e) {
return null;
}
}

return {
browser: getBrowserName(),
acrobat: isAcrobatInstalled() ? 'Acrobat ' : false,
acrobatVersion: getAcrobatVersion()
};
};

var info = getAcrobatInfo();
if(info.acrobat == false)
{
document.getElementById('a2').innerHTML = "Not Installed";
//document.writeln("Acrobat not installed");
} else {
document.getElementById('a2').innerHTML = "<strong>" + info.acrobat + info.acrobatVersion + "</strong>";
//document.writeln("<strong>" + info.acrobat + info.acrobatVersion + "</strong>");
document.getElementById('a1').className = 'success';
document.getElementById('a3').innerHTML = '<i class="icon-ok"></i>'
}



//******Flash detect section ****************
var txt = "Flash not installed";
	if(FlashDetect.installed){
		txt = "<strong>Flash " + FlashDetect.major + "</strong>"; 
		document.getElementById('f2').innerHTML = txt;
		document.getElementById('f1').className = 'success';
		document.getElementById('f3').innerHTML = '<i class="icon-ok"></i>';   	
	}else
	{
//document.writeln(txt)
document.getElementById('f2').innerHTML = txt;
}

// ******************Screen size detect section ***************
var txt1;
var TextOut5 = screen.width + 'x' + screen.height;
if ((screen.width>=1024) && (screen.height>=786)) {
 txt1 = "<strong>" + screen.width + 'x'+screen.height + "</strong>";
 document.getElementById('s1').className = 'success';
document.getElementById('s3').innerHTML = '<i class="icon-ok"></i>'    	
}
else {
	if ((screen.width>=786) && (screen.height>=1024)) {
	 txt1 = "<strong>" + screen.width + 'x'+screen.height + "</strong>";
	  document.getElementById('s1').className = 'success';
	document.getElementById('s3').innerHTML = '<i class="icon-ok"></i>'   
	}else {
  	txt1 =  screen.width + 'x'+screen.height;
  	}
}
document.getElementById('s2').innerHTML = txt1;

document.getElementById('td6').innerHTML = window.innerWidth + 'x' + window.innerHeight ;
//document.write(window.innerWidth + 'x' + window.innerHeight );
//*********************email compose section*****************************
function sendMail() {
	var MessageBody = "* JavaScript: Enabled";
	var MailPHP = <?php echo json_encode($TextPHP);?>;
	MessageBody = MessageBody + "   * Operating System: " + MailPHP ;
	MessageBody = MessageBody + "   * Browser: " + Brout;
	MessageBody = MessageBody + "   * Acrobat: " + info.acrobat + " " + info.acrobatVersion;
	if(FlashDetect.installed){var Text4 = FlashDetect.major}else {var Text4 = "Not Installed" };
	MessageBody = MessageBody + "   * Flash: " + Text4;
	MessageBody = MessageBody + "   * Screen Size: " + TextOut5;
	MessageBody = MessageBody + "   * Browser Width: " + window.innerWidth + 'x' + window.innerHeight;
    var link = "mailto:louise.robertson@oup.com"
             + "?cc=paul.kent@oup.com"
             + "&subject=" + "Computer Configuration"
             + "&body= " + MessageBody ;

    window.location.href = link;
}


</script>		

	</body>
</html>