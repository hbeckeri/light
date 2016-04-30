jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(
    
        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",
        
        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,
        
        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        
        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",
        
        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
        }
    );
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "caseyscarborough", selector: "#ghfeed" });


});

var peaks = ["Mt. Elbert","Mt. Massive","Mt. Harvard","Blanca Peak","La Plata Peak","Uncompahgre Peak","Crestone Peak","Mt. Lincoln","Grays Peak","Mt. Antero","Torreys Peak","Castle Peak","Quandary Peak","Mt. Evans","Longs Peak","Mt. Wilson / Mt. Cameron","Mt. Shavano","Mt. Shavano","Crestone Needle","Mt. Princeton","Mt. Yale","Mt. Bross","Kit Carson Peak / El Diente Peak","Maroon Peak","Tabeguache Peak","Mt. Oxford","Mt. Sneffels","Mt. Democrat","Capitol Peak","Pikes Peak","Snowmass Mtn","Mt. Eolus","Windom Peak","Challenger Point","Mt. Columbia","Missouri Mountain","Humboldt Peak","Mt. Bierstadt / Conundrum Peak","Sunlight Peak","Handies Peak","Culebra Peak","Ellingwood Point","Mt. Lindsey / North Eolus","Little Bear Peak","Mt. Sherman","Redcloud Peak","Pyramid Peak","Wilson Peak","Wetterhorn Peak / North Maroon Peak","San Luis Peak","Mt. of the Holy Cross","Huron Peak","Sunshine Peak"];
var elev = ["14,433'","14,421","14,420","14,345","14,336","14,309","14,294","14,286","14,270","14,269","14,267","14,265","14,265","14,264","14,255","14,246 / 14,238","14,229","14,197","14,197","14,197","14,196","14,172","14,165 / 14,159","14,156","14,155","14,153","14,150","14,148","14,130","14,110","14,092","14,083","14,082","14,081","14,073","14,067","14,064","14,060","14,059","14,048","14,047","14,042","14,042 / 14,039","14,037","14,036","14,034","14,018","14,017","14,015 / 14,014","14,014","14,005","14,003","14,001"];
function getPeaked() {
    $.get('/data', function(data) {
        $('#h').text("Completed " + data.length+" of 53");
        var peaked = [];
        for(var i = 0; i < peaks.length; i++) {
            peaked.push(false);
        }
        for (var i = 0; i < data.length; i++) {
            var j = parseInt(data[i]) - 1;
            peaked[j] = true;
        }
        for (var i = 0; i < peaks.length; i++) {
            addRow(i+1, peaks[i], elev[i], peaked[i]);
        }
    });
}
function addRow(rank, peak, elev, completed) {
    if (completed) { $('#t').append('<tr class="green"><td>'+rank+'</td><td>'+peak+'</td><td>'+elev+'</td></tr>'); }
    else { $('#t').append('<tr class=""><td>'+rank+'</td><td>'+peak+'</td><td>'+elev+'</td></tr>'); }
}
function getFeed() {
    console.log("getting feed");
    $.get('/feed', function(data){
        addText(data);
    });
}
function addText(str) {
    $('#feed').empty();
    $('#feed').text(str);
}
