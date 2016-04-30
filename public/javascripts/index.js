function addPost (msg, votes, id) {
    $('#posts').append(
        '<li class="list-group-item">' +
        '<div class="btn-group" role="group" aria-label="...">' +
        '<button onClick="upvote(this.id)" id="'+id+'" type="button" class="btn btn-default">+</button>' +
        '<div id="'+id+'" class="btn btn-default">' + votes +'</div>' +
        '<button onClick="downvote(this.id)" id="'+id+'" type="button" class="btn btn-default">-</button>' +
        '<button onClick="removePost(this.id)" id="'+id+'" type="button" class="btn btn-danger">X</button>' +
        '</div>' + msg + '</li>');
}
function addSearch(str) {
    $('#searchResults').append(
        '<li class="list-group-item">' + str + '</li>'
    );
}

function refresh() {
    console.log('refreshing');
    $('#posts').empty();
    $.get('getPosts', function (data) {
        for(var i=0; i < data.length; i++) {
            addPost(data[i].content, data[i].voteCount, data[i]._id);
        }
    });
}

function upvote(id) {
    $.post('upvote', {_id: id}, function(req, res) {});
    window.setTimeout(refresh, 50);
}

function downvote(id) {
    $.post('downvote', {_id: id}, function(req, res) {});
    window.setTimeout(refresh, 50);
}

function removePost(id) {
    $.post('removePost', {_id: id }, function(req, res){});
    window.setTimeout(refresh, 50);
}

function createPost(content) {
    $.post('createPost', {content: content}, function(req, res) {});
    window.setTimeout(refresh, 50);
}

function search(query) {
    $('#searchResults').empty();
    $.get('http://ws.spotify.com/search/1/album.json?q=' + query ,function(res) {
        for(var i = 0; i < 3; i++) {
            addSearch("Album: " + res.albums[i].name);
        }
    });
    $.get('http://ws.spotify.com/search/1/artist.json?q=' + query ,function(res) {
        for(var i = 0; i < 3; i++) {
            addSearch("Artist: " + res.artists[i].name);
        }
    });
    $.get('http://ws.spotify.com/search/1/track.json?q=' + query ,function(res) {
        for(var i = 0; i < 3; i++) {
            addSearch("Track: " + res.tracks[i].name);
        }
    });
}


$.get('http://ws.spotify.com/search/1/album.json?q=imagine'  ,function(res) {
    console.log(res);
});

$('#createPost').click(function(evt){
    search($('#contentInput').val());
    $('#contentInput').val("");
});
$('#contentInput').on('keyup', function(){
    window.setInterval(search($('#contentInput').val()), 100);
});
window.setInterval(refresh, 10000);
refresh();


