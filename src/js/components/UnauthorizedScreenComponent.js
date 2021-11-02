class UnauthorizedScreenComponent {
    constructor(selector) {
        this.selector = selector;
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.hidden();
            this.show();
        })
    }
    init() {
        this.container = document.querySelector(this.selector);
    }
    hidden(a) {
        this.init();
        if(a) this.container.style.display = 'none';
    }
    show(a) {
        this.init();
        if(a) this.container.style.display = 'block';
    }
}
module.exports = UnauthorizedScreenComponent;