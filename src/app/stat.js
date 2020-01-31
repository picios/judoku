import Confirmation from './confirmation';
var $ = require("jquery");

class Stat {
    constructor(app) {
        const scope = this;
        this.board = app.board;

        let html = '<select class="form-control select-level">\
        <option value=50>normal</option>\
        <option value=29>hard</option>\
        <option value=65>easy</option>\
</select>'
        this.confirm = new Confirmation({
            $target: $('.btn-confirm'),
            title: 'New game?',
            body: 'Select the game level<br />' + html,
            yes: function() {
                app.level = $('#' + this.getId() + ' .select-level').val();
                app.reset(true);
                app.redraw();
                location.reload();
            }
        });
        app.postrenders['confirm'] = function() { scope.confirm.postrender(); }
        app.postrenders['confirm_new'] = function() {
            $('.btn-confirm').off("click").on("click", function(e) {
                e.preventDefault();
                scope.confirm.trigger();
            });
        }
    }

    render() {
        let render = [];
        render.push('<div class="stat">');
        render.push('<div class="row numbers">');

        let numbers = {};
        for (let i=1; i<=9; i++) {
            numbers[i] = 0;
        }
        //console.log(numbers);
        //return;
        let left = 0;
        for (let row of this.board.cubes) {
            for (let cube of row) {
                let value = cube.getValue();
                if (value !== 0) {
                    numbers[value]++;
                } else {
                    left++;
                }
            }
        }

        for (const [value, amount] of Object.entries(numbers)) {
            //console.log(key, value);
            render.push('<div class="col">');
            
            if (amount === 9) {
                render.push('<div class="number btn btn-secondary disabled" data-value="'+value+'">')
            } else {
                render.push('<div class="number btn btn-secondary" data-value="'+value+'">')
            }
            render.push('<div class="value">' + value + '</div>');
            render.push('<div class="amount">' + amount + '</div>');
            render.push('</div><!-- number -->');
            render.push('</div><!-- col -->');
        }

        render.push('<div class="col"><div class="number btn btn-secondary" data-value="'+0+'"><div class="value">&times;</div></div></div>');

        render.push('</div><!-- numbers -->');

        render.push('<div class="row second-row">');
        render.push('<div class="col left">');
        render.push('To uncover: ' + left);
        render.push('</div><!-- left -->');
        render.push('<div class="col reset">');
        render.push('<a href="#" class="reset-link btn btn-secondary btn-confirm">New game</a>');
        render.push(this.confirm.render());
        render.push('</div><!-- reset -->');
        render.push('</div>');
        render.push('</div><!-- stat -->');
        return render.join("\n");
    }
}

export default Stat;