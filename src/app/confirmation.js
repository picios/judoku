require('bootstrap');
var $ = require("jquery");

class Confrimation {
    constructor(options) {
        const scope = this;
        const id = 'modal_' + Math.random().toString(36).substr(2, 9);
        let def = {
            title: 'Please confirm',
            body: null,
            yes: function() {},
            no: function() {},
            postrender: function() {},
            id: id,
        };
        $.extend(def, options);
        this.options = def;
    }

    getId() {
        return this.options.id;
    }

    postrender() {
        const scope = this;
        let $box = $('#' + this.options.id);

        $(".modal-btn-yes", $box).off("click").on("click", function(e) {
            e.preventDefault();
            $("#" + scope.options.id).modal('hide');
            scope.options.yes.call(scope);
        });
          
        $(".modal-btn-no", $box).off("click").on("click", function(e) {
            e.preventDefault();
            $("#" + scope.options.id).modal('hide');
            scope.options.no.call(scope);
        });

        this.options.postrender.call(this);
    }

    trigger() {
        const scope = this;
        $("#" + scope.options.id).modal('show');
    }

    render() {
        let render = [];
        render.push('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="'+this.options.id+'">\
        <div class="modal-dialog modal-sm">\
          <div class="modal-content">\
            <div class="modal-header">\
              <h4 class="modal-title">'+this.options.title+'</h4>\
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
            </div>');
        
        if (this.options.body !== null) {
            render.push('<div class="modal-body">\
                <p>'+this.options.body+'</p>\
            </div>');
        }
        
        render.push('<div class="modal-footer">\
              <button type="button" class="btn btn-default modal-btn-yes">Yes</button>\
              <button type="button" class="btn btn-primary modal-btn-no">No</button>\
            </div>\
          </div>\
        </div>\
      </div>');
      return render.join("\n");
    }
}

export default Confrimation;