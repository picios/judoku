import './style.scss';
import App from './app/app';

var $ = require("jquery");

$(e => {
    var app = new App({
        $box: $('.game')
    });
    app.run();
});
