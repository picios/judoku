import Cube from './cube';

class Board {
    constructor(board) {
        this.board = board;
        this.cubes = [];
        this.currentCube = null;
        this.create();
        //console.log(this.cubes);
    }

    create() {
        let rw = 0;
        for (let row of this.board) {
            let cl = 0;
            this.cubes[rw] = this.cubes[rw] ? this.cubes[rw] : [];
            for (let cell of row) {
                let cube = new Cube();
                cube.setValue(cell);
                cube.setPosition(rw, cl);
                if (cube.getValue() !== 0) {
                    cube.setReadlny(true);
                }
                if (rw % 3 === 0) {
                    cube.addClass('bold-top');
                }
                if (cl % 3 === 0) {
                    cube.addClass('bold-left');
                }
                if (cl % 8 === 0 && cl > 0) {
                    cube.addClass('bold-right');
                }
                if (rw % 8 === 0 && rw > 0) {
                    cube.addClass('bold-bottom');
                }
                this.cubes[rw][cl] = this.cubes[rw][cl] ? this.cubes[rw][cl] : [];
                this.cubes[rw][cl] = cube;
                cl++;
            }
            rw++;
        }
    }

    getCube(row, col) {
        return this.cubes[row][col];
    }

    getCubes() {
        return this.cubes;
    }

    setCurrentCube(cube) {
        this.currentCube = cube;
    }

    getCurrentCube() {
        return this.currentCube;
    }

    defocusAllCubes() {
        for (let row of this.cubes) {
            for (let cube of row) {
                cube.defocus();
            }
        }
    }

    highlightRowAndCol(row, col) {
        let rw = 0;
        for (let crow of this.cubes) {
            let cl = 0;
            for (let cube of crow) {
                if (row === rw || col === cl) {
                    cube.highlight();
                }
                cl++;
            }
            rw++;
        }
    }

    tipByValue(value) {
        for (let row of this.cubes) {
            for (let cube of row) {
                if (value !== 0 && value === cube.getValue()) {
                    cube.tip();
                }
            }
        }
    }

    render() {
        let render = [];
        render.push('<div class="board">');
        for (let row of this.cubes) {
            render.push('<div class="row">')
            for (let cube of row) {
                render.push(cube.render());
            }
            render.push('</div><!-- row -->')
        }
        render.push('</div><!-- board -->');
        return render.join("\n");
    }
}

export default Board;