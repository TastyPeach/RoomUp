$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname);
    
    chatsock.onmessage = function(message) {
        var data = JSON.parse(message.data);
        var chat = $("#chatcontent")
        var ele = $('<div style="margin-bottom: 15px; text-align:right;"></div>')
        
        ele.append(
            $("<div></div>").text(data.timestamp).css({"float":"right", "margin-left":"1rem", "font-size":"12px", "font-weight":"200"})
        )
       
        ele.append(
            $("<div></div>").text(data.handle).css({"font-weight":"bolder","position":"relative","margin-bottom":"1rem","top": "-3.5px"})
        )
        
        ele.append(
            $("<div></div>").text(data.message).css({"font-size": "1.11em"}) //.css({"font-size: 1.11em;"})
        )
        
        chat.append(ele)
        
        $(document).ready(function(){
            $(this).scrollTop($(window).height());
        });
    };

    $("#chatform").on("submit", function(event) {
        var message = {
            handle: $('#handle').text().replace(/\s/g, ''),
            message: $('#message').val(),
        }
        chatsock.send(JSON.stringify(message));
        $("#message").val('').focus();
        
        $(document).ready(function(){
            $(this).scrollTop($(window).height());
        });
        return false;
    });
});
