class Info {
    constructor(board) {
        this.board = board;
    }

    render() {
        let render = [];
        render.push('<div class="info">');
        render.push('<div class="row">');
        render.push('<div class="col copy">');
        render.push('2019 copyright picios');
        render.push('</div><!-- copy -->');
        render.push('</div><!-- row -->');
        render.push('</div><!-- info -->');


        return render.join("\n");
    }
}

export default Info;