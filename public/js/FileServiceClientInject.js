;
(function(window, $) {
    'use strict';

    function FileServiceClientInject(type) {
        $.ajax({
            url: "/FileServiceClient-"+type+".html",
            success: function (data) { $('body').append(data); },
            dataType: 'html'
        });
    };

    window.FileServiceClientInject = FileServiceClientInject;

})(window, $);