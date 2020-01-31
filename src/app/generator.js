
Array.prototype.clone = function() {
	return this.slice(0);
};

class Generator {
    constructor(options) {
        this.base = 3;
        this.side = this.base * this.base;
        this.level = 20;
    }

    setLevel(level) {
        this.level = level;
    }

    pattern(r, c) {
        return (this.base * (r%this.base) + Math.floor(r/this.base) + c) % this.side + 1;
    }

    shuffle(b) {
        let a = b.clone();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    range(n, start = 0) {
        let a = [];
        for (var i = start; i<n; i++) {
            a.push(i);
        }
        return a;
    }

    generate() {

        let rBase = this.range(this.base, 0);
        //console.log(rBase, this.shuffle(rBase));
        //return;
        let rows = [];
        let sb1 = this.shuffle(rBase);
        let sb2 = this.shuffle(rBase);
        //console.log(rBase, sb1, sb2);
        for (var g of sb1) {
            for (var r of sb2) {
                let val = g*this.base + r;
                rows.push(val);
            }
        }

        let cols = [];
        let sb3 = this.shuffle(rBase);
        let sb4 = this.shuffle(rBase);
        for (var h of sb3) {
            for (var c of sb4) {
                let val = h*this.base + c;
                cols.push(val);
            }
        }

        let nums = this.shuffle(this.range(this.side + 1, 1));

        let board = [];
        var rw = 0;
        
        for (let row of rows) {
            board[rw] = board[rw] ? board[rw] : [];
            var cl = 0;
            for (let col of cols) {
                board[rw][cl] = board[rw][cl]  ?  board[rw][cl] : [];
                board[rw][cl] = this.pattern(row,col);
                cl++;
            }
            rw++;
        }
        
        
        // keep solution
        let solution = [];
        for (var i = 0; i < board.length; i++) {
            solution[i] = board[i].clone();
        }
       
        let puzzle = this.adjustLevel(board);
        return {
            sollution: solution,
            puzzle: puzzle
        };
    }

    adjustLevel(board) {
        let rw = 0;
        let counter = 0;
        for (let row of board) {
            let cl = 0;
            for (let col of row) {
                let random = Math.floor(Math.random() * 100);
                if (random > this.level && counter < 63) {
                    board[rw][cl] = 0;
                    counter++;
                }
                cl++;
            }
            rw++;
        }
        return board;
    }
}

export default Generator;