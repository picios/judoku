require('bootstrap');
var $ = require("jquery");

import Cube from './cube';
import Board from './board';
import Stat from './stat';
import Info from './info';
import Generator from './generator';
import Windialog from './windialog';


class App {
    constructor(options) {
        this.$box = options.$box;
        this.width = 500;
        this.height = 500;
        this.board = null;
        this.boards = null;
        this.level = 50;
        this.postrenders = {};
    }

    run() {
        this.logic = new Generator();
        this.reset();
        this.stat = new Stat(this);
        this.info = new Info(this.board);
        this.win = new Windialog(this);
        this.events();
        this.redraw();
    }

    events() {
        const scope = this;
        $(document).keyup(e => {
            var cube = scope.board.getCurrentCube();
            //console.log(cube);
            switch(e.keyCode) {
                case 49: case 97: // 1
                    cube.changeValue(1);
                    break;
                case 50: case 98: // 2
                    cube.changeValue(2);
                    break;
                case 51: case 99: // 3
                    cube.changeValue(3);
                    break;
                case 52: case 100: // 4
                    cube.changeValue(4);
                    break;
                case 53: case 101: // 5
                    cube.changeValue(5);
                    break;
                case 54: case 102: // 6
                    cube.changeValue(6);
                    break;
                case 55: case 103: // 7
                    cube.changeValue(7);
                    break;
                case 56: case 104: // 8
                    cube.changeValue(8);
                    break;
                case 57: case 105: // 9
                    cube.changeValue(9);
                    break;
                case 8: case 46: case 96: // del
                    cube.changeValue(0);
                    break;
            }

            scope.clickCube(cube);
        });
    }

    clickCube(cube) {
        if (cube === null) {
            return;
        }
        $('.cube[data-row="'+cube.getPosition().row+'"][data-col="'+cube.getPosition().col+'"]').click();
    }

    boardEvents() {
        const scope = this;
        $('.cube', this.$box).off('click').on('click', e => {
            var $this = $(e.currentTarget);
            let row = $this.data('row');
            let col = $this.data('col');
            scope.board.defocusAllCubes();
            scope.board.highlightRowAndCol(row, col);
            let cube = scope.board.getCube(row, col);
            scope.board.tipByValue(cube.getValue());
            cube.select(scope.board);
            scope.redraw();
        });

        $('.number', this.$box).off('click').on('click', e => {
            var $this = $(e.currentTarget);
            var cube = scope.board.getCurrentCube();
            cube.changeValue($this.data('value'));
            scope.clickCube(cube);
        });
    }

    redraw() {
        this.validate();
        
        let render = this.board.render();
        render += this.stat.render();
        render += this.info.render();
        render += this.win.render();
        this.$box.html(render);

        if (this.isWin()) {
            this.win.show();
        }

        //this.stat.confirm.postrender();
        this.postrender();
        this.boardEvents();
        this.save();
    }

    postrender() {
        const scope = this;
        Object.keys(scope.postrenders).forEach(key => {
            let callback = scope.postrenders[key];
            callback.call(this);
        });
    }

    reset(state) {
        let saved = localStorage.getItem('boards');
        if (saved && saved.indexOf('Object') === -1 && state === undefined) {
            this.boards = JSON.parse(saved);
        } else {
            this.logic.setLevel(this.level);
            this.boards = this.logic.generate();
        }
        this.board = new Board(this.boards.puzzle);
    }

    save() {
        for (let row of this.board.getCubes()) {
            for (let cube of row) {
                this.boards.puzzle[cube.getPosition().row][cube.getPosition().col] = cube.getValue();
            }
        }
        let saved = JSON.stringify(this.boards);
        localStorage.setItem('boards', saved);
    }

    validate() {
        let rw = 0;
        for (let row of this.board.getCubes()) {
            let cl = 0;
            for (let cube of row) {
                if (cube.getValue() !== 0) {
                    if (cube.getValue() !== this.boards.sollution[rw][cl]) {
                        cube.setValid(false);
                    } else {
                        cube.setValid(true);
                    }
                } else {
                    cube.setValid(true);
                }
                cl++;
            }
            rw++;
        }
    }

    isWin() {
        let isWin = true;
        for (let row of this.board.getCubes()) {
            for (let cube of row) {
                if (cube.getValue() === 0 || !cube.getValid()) {
                    isWin = false;
                    break;
                }
                if (isWin === false) {
                    break;
                }
            }
        }
        return isWin;
    }

}

export default App;