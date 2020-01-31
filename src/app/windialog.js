import Confirmation from './confirmation';

class Windialog {
    constructor(app) {
        const scope = this;
        this.win = new Confirmation({
            title: 'You win!',
            body: 'Do you want to try again?',
            yes: function() { 
                app.reset(true);
                app.redraw();
                location.reload();
            }
        });
        app.postrenders['win'] = function() { scope.win.postrender(); }
    }

    show() {
        this.win.trigger();
    }

    render() {
        return this.win.render();
    }
}

export default Windialog;