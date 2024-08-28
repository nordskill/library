class ContextMenu {
    constructor() {
        this.contextMenu = document.createElement('div');
        this.contextMenu.id = 'context-menu';
        this.contextMenu.setAttribute('popover', '');
    }

    init({menu, on_show, on_hide}) {
        const self = this;

        if (on_show) this.onShow = on_show;
        if (on_hide) this.onHide = on_hide;

        self.contextMenu.innerHTML = '';
        self.contextMenu.appendChild(createChildren(menu));

        function createChildren(menu) {
            const list = document.createElement('ul');

            menu.forEach(element => {
                checkForMissingAttributes(element);

                const listElement = createChild(element);

                if (element.submenu) {
                    listElement.appendChild(createChildren(element.submenu));
                }

                list.appendChild(listElement);
            })

            return list;
        }

        function checkForMissingAttributes(element) {
            const attributes = element.submenu ? ['label'] : ['label', 'on_click'];

            attributes.forEach(attr => {
                if (!element[attr]) {
                    console.error(`'${attr}' attribute for element with '${element.label}' label is obligatory. Please provide it.`);
                }
            })
        }

        function createChild(attributes) {
            const { id, label, title, disabled, on_click } = attributes;

            const element = document.createElement('li');

            id && (element.id = id);
            disabled && (element.disabled = true);
            on_click && (element.onclick = (e) => {
                e.stopPropagation();

                self.contextMenu.hidePopover();
                on_click();
                self.onHide && self.onHide();
            });

            element.innerHTML = `<a href="#" ${title && "title="+title}>${label}</a>`

            return element;
        }
    }

    show(e) {
        document.body.appendChild(this.contextMenu);
        this.contextMenu.showPopover();

        const { width: menuWidth, height: menuHeight } = this.contextMenu.getBoundingClientRect();
        const { innerWidth: pageWidth, innerHeight: pageHeight } = window;
        let marginLeft = 5, marginTop = 5;

        let { clientX: mouseX, clientY: mouseY } = e;
        let directionX = 'right';


        if (mouseY + menuHeight > pageHeight ) {
            mouseY -= menuHeight;
            marginTop = -5;
        }

        if (mouseX + menuWidth > pageWidth) {
            mouseX -= menuWidth;
            marginLeft = -5;
        }

        this.contextMenu.style.left = `${mouseX + marginLeft}px`;
        this.contextMenu.style.top = `${mouseY + marginTop}px`;

        const listItems = this.contextMenu.querySelectorAll(':scope > ul > li');

        handleSubmenuDisplaying(listItems);
        this.onShow && this.onShow();

        function handleSubmenuDisplaying(list) {
            list.forEach(item => {
                const nestedUl = item.querySelector(':scope > ul');

                if (nestedUl) {
                    item.addEventListener('mouseenter', function(e) {
                        displayOnProperSide(nestedUl);
                    });

                    item.addEventListener('mouseleave', function(e) {
                        directionX = 'right';
                        nestedUl.style.zIndex = '';
                    })

                    handleSubmenuDisplaying(nestedUl.querySelectorAll(':scope > li'));
                }
            });
        }

        function displayOnProperSide(list) {
            const { width: listWidth, height: listHeight, top: posY, left: posX } = list.getBoundingClientRect();

            list.style.zIndex = '1';

            if (posX + listWidth > pageWidth || directionX === 'left') {
                list.style.right = '100%';
                list.style.left = 'unset';
                directionX = 'right';
            }

            if (posY + listHeight > pageHeight) {
                list.style.top = pageHeight - posY - listHeight + 'px';
            }
        }
    }
}

export default new ContextMenu();