class Cube {

    constructor() {
        this.isSelected = false;
        this.isHighlight = false;
        this.isTipped = false;
        this.isReadonly = false;
        this.isValid = true;
        this.classes = [
            'col', 'cube',
        ];
    }

    setValue(value) {
        this.value = value;
    }

    changeValue(value) {
        if (this.isReadonly) {
            return;
        }
        this.setValue(value);
    }

    getValue() {
        return this.value;
    }

    setReadlny(state) {
        this.isReadonly = state;
    }

    getReadonly() {
        return this.isReadonly;
    }

    setValid(state) {
        this.isValid = state;
    }

    getValid() {
        return this.isValid;
    }

    setPosition(r, c) {
        this.position = {
            row: r,
            col: c
        };
    }

    getPosition() {
        return this.position;
    }

    addClass(className) {
        const index = this.classes.indexOf(className);
        if (index === -1) {
            this.classes.push(className);
        }

    }

    removeClass(className) {
        const index = this.classes.indexOf(className);
        if (index > -1) {
            this.classes.splice(index, 1);
        }
    }

    select(board) {
        this.isSelected = true;
        board.setCurrentCube(this);
    }

    deselect() {
        this.isSelected = false;
    }

    highlight() {
        this.isHighlight = true;
    }

    dehighlight() {
        this.isHighlight = false;
    }

    tip() {
        this.isTipped = true;
    }

    detip() {
        this.isTipped = false;
    }

    defocus() {
        this.isSelected = false;
        this.isHighlight = false;
        this.isTipped = false;
    }

    render() {
        let position = this.getPosition();
        let value = this.getValue() > 0 ? this.getValue() : '';

        if (this.isSelected === true) {
            this.addClass('selected');
        } else {
            this.removeClass('selected');
        }

        if (this.isHighlight === true) {
            this.addClass('highlight');
        } else {
            this.removeClass('highlight');
        }

        if (this.isTipped === true) {
            this.addClass('tipped');
        } else {
            this.removeClass('tipped');
        }

        if (this.isReadonly === true) {
            this.addClass('readonly');
        }

        if (this.isValid === false) {
            this.addClass('invalid');
        } else {
            this.removeClass('invalid');
        }

        return "<div class=\"" + this.classes.join(' ') + "\" data-row=\"" + position.row + "\" data-col=\"" + position.col + "\"><div class=\"value\">" + value + "</div></div>";
    }
}

export default Cube;