;
(function(window, $) {
    'use strict';

    function FileServiceClient(options) {
        this.opt = $.extend({
            fileType: "all",
            selectMode: "single",
            uploadMode: "none",
            rootSelector: "#universal-file-manager",
            uploadSelector: "#file-upload-container",
            selectSelector: "#file-select-container",
            tags: null,
            cb_selected: function(err, data) {},
            cb_upload_done: function(err, data) {},
            cb_cancel: function(err, data) {},
            show_users: false,
            show_practice: false
        }, options);
        this._init();
    };

    FileServiceClient.prototype.show = function() {
        $(this.opt.rootSelector).modal('show');
    }

    FileServiceClient.prototype._renderForState = function() {

    }

    FileServiceClient.prototype._init = function() {
        this._els = {};
        this._els.upload = $(this.opt.uploadSelector);
        this._els.select = $(this.opt.selectSelector);
        this._els.selectPanel = $("#file-select-panel");
        this._els.uploadPanel = $("#file-upload-panel");

        if (this.opt.selectMode !== "none") {
            this._initSelect();
            $(this._els.selectPanel).addClass('in');
        } else {
            $(this._els.select).css('display', 'none');
            $(this._els.uploadPanel).addClass('in');
        }
        if (this.opt.uploadMode !== "none") {
            this._initUpload();

        } else {
            $(this._els.upload).css('display', 'none');
        }
    }


    FileServiceClient.prototype._initSelect = function() {
        if (!this.filetable) {
            this.filetable = $('#file_select_table').DataTable({
                "dom": '<"toolbar">frtip',
                "processing": true,
                "ajax": "/file",
                // "aaData": file_data.data,
                "bLengthChange": false,
                "pagingType": "simple",
                "columns": [
                    { "data": "name" },
                    { "data": "meta.ext" },
                    { "data": "meta.size" },
                    { "data": "meta.creator" },
                    { "data": "users", "bVisible": false },
                    { "data": "meta.mime", "bVisible": false },
                    { "data": "descr", "bVisible": false },
                    { "data": "meta.original_name", "bVisible": false },
                    { "data": null, "bVisible": false }
                ],
                // "aoColumns": [{},{},{},{},{"bVisible": false},{"bVisible": false},{"bVisible": false},{"bVisible": false},{"bVisible": false}]
            });
        } else {
            // repopulate data via datatables API
            // or maybe destroy table & recreate? table.destroy();
        }


        $("div.toolbar").html($('#table-cols-picker').html());

        $('.file_select_col_vis input[type="checkbox"]').on('change', function(e) {
            var column = file_table.column($(this).attr('data-value'));
            column.visible(!column.visible());
        });

        $('#file_select_table tbody').on('click', 'tr', function() {
            $(this).toggleClass('selected');
        });

        $('#button').click(function() {
            alert(table.rows('.selected').data().length + ' row(s) selected');
        });
    }


    FileServiceClient.prototype._initUpload = function() {


        if (this.show_users == true) {

        } else {
            $(".file-options-perms-users").css('display', 'none');
        }

        if (this.show_practice == true) {

        } else {
            $(".file-options-perms-practice").css('display', 'none');
        }
    }

    window.FileServiceClient = FileServiceClient;

})(window, $);