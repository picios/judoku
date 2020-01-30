class Stat {
    constructor(board) {
        this.board = board;
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

        render.push('<div class="row info">');
        render.push('Pozostało ' + left);
        render.push('</div><!-- info -->');
        render.push('</div><!-- stat -->');


        return render.join("\n");
    }
}

export default Stat;