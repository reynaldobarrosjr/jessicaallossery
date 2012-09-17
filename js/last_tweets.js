// setting properties
var TWITTER_SCREEN_NAME = "jallossery"; // Screen name of twitter account you want to get last tweets
var tweets=5; // How many tweets
var speed=3; // in seconds


// do not touch under here unless you know what to do
var URL="php/proxy.php?url=http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=";
var links=new Array();
var id=0;


// load tweets via RSS
function loadTweets()
{
	$("#widget_title").text("Last Tweets by "+TWITTER_SCREEN_NAME);
	$("#counter").text(id+1+"/"+tweets);

	$.ajax({
			type: "GET",
			url: URL+TWITTER_SCREEN_NAME,
			dataType: "xml",
			success: function(xml) 
			{
				$(xml).find('item').each(function(value)
				{
					if(value < tweets)
					{
						$("#tweets").append('<div id="ciao" style="position:absolute; width:430px; left:'+value*450+'px;">'+$(this).find("title").text()+'<br/><strong>'+$(this).find("pubDate").text()+'</strong></div>');
						links[value]=$(this).find("link").text();
					}
				});
				
				$("#container").css("background","none");
				addListeners();
				startTimer();
			}
	});
}


// add mouse events
function addListeners()
{
	$("#tweets").mouseover(function()
	{
	    $(this).css("color","#999");
	});
	
	$("#tweets").mouseout(function()
	{
	    $(this).css("color","#6F7986");
	});

	$("#tweets").click(function()
	{
	    $(location).attr("href",links[id]);
	});
}


// start timer
function startTimer()
{
	var t=setTimeout("increaseID()",speed*1000);
}


// increase id
function increaseID()
{
	id++;
	
	if(id >= links.length)
		id=0;
	
	$("#holder").animate({"left": "-"+id*450+"px"}, "fast");
	$("#counter").text(id+1+"/"+tweets);
	
	startTimer();
}