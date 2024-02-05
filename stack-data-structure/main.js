const stackGenerateForm = document.querySelector('#generate');
const inputValue = document.querySelector('#input-value');
const push = document.querySelector('#push');
const pop = document.querySelector('#pop');
const isEmpty = document.querySelector('#empty');
const peek = document.querySelector('#peek');
const reset = document.querySelector('#reset');
const dragZone = document.querySelector('.drag-zone');
const dropTarget = document.querySelector('.drop-target');
const messageBox = document.querySelector('#message-box');
const stackSize = document.querySelector('#stack-size');

// generate random rgb color
const randomRGB = () => {
    let red = Math.floor(Math.random() * 256) + 1;
    let green = Math.floor(Math.random() * 256) + 1;
    let blue = Math.floor(Math.random() * 256) + 1;
    let rgb = `rgb(${red}, ${green}, ${blue})`;
    return {
        r: red,
        g: green,
        b: blue,
        color: rgb
    }
}

// convert rgb values into hex code
const rgbToHex = (r, g, b) => '' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);


// generate unique colors for each node
const uniqueColor = amount => {
    let result = [];
    for (let i = 0; i < amount; i++) {
        let color = randomRGB().color;
        color !== result[result.length - 1] ? result.push(color) : i--;
    }
    return result;
}

// generate random number between 1 and 42
const randomNumber = () => Math.floor(Math.random() * 42) + 1;

// event handler for each individual node when pushed or popped.
const pushPopOnClick = (node) => {
    node.addEventListener(
        'click',
        e => {
            if (e.currentTarget.parentElement.className === "drag-zone") {
                messageBox.innerHTML = `${e.currentTarget.innerHTML} was pushed successfully.`;
                e.currentTarget.className = "stack-element";
                dropTarget.insertBefore(e.currentTarget, dropTarget.firstElementChild);
                stackSize.innerHTML = (parseInt(stackSize.innerHTML) - 1).toString();
            } else if (e.currentTarget.parentElement.className === "drop-target") {
                messageBox.innerHTML = `${e.currentTarget.innerHTML} was popped successfully.`;
                if (e.currentTarget === dropTarget.firstElementChild) {
                    e.currentTarget.className += " not-in-stack";
                    dragZone.insertBefore(e.currentTarget, dragZone.firstElementChild);
                    stackSize.innerHTML = (parseInt(stackSize.innerHTML) + 1).toString();
                } else {
                    messageBox.innerHTML = "";
                    e.currentTarget.className += " shake";
                    e.currentTarget.addEventListener(
                        'animationend',
                        e =>{
                            e.currentTarget.className = "stack-element";
                        }
                    );
                    let message = `Nah you can only pop the top-most node.`;
                    messageBox.append(message);
                }
            }
            if (parseInt(stackSize.innerHTML) == 42) messageBox.innerHTML += ` <b>Stack Underflow</b> because the stack is empty.`;
            if (parseInt(stackSize.innerHTML) == 0) messageBox.innerHTML += ` <b>Stack Overflow</b> because the stack is full.`;
        }
    );
}

// generate nodes for the stack.
const loadNodes = x => {
    for (let i = 0; i < x; i++) {
        let element = `
<div 
class='stack-element not-in-stack' 
style='background-color: ${uniqueColor(x)[i]}; text-align: center'>
ID : ${rgbToHex(randomRGB().r, randomRGB().g, randomRGB().b).toUpperCase()}
</div>`;
        dragZone.insertAdjacentHTML('afterbegin', element);
        pushPopOnClick(dragZone.firstElementChild);
    }
}

window.addEventListener(
    'load',
    () => {
        loadNodes(randomNumber());
    },
    false
);

// generate nodes on submit.
stackGenerateForm.addEventListener('submit', e => {
    e.preventDefault();
    let num = parseInt(inputValue.value);
    let maxSize = 42;
    if (dragZone.childElementCount +  dropTarget.childElementCount + num > maxSize) {
        num = maxSize - (dragZone.childElementCount + dropTarget.childElementCount);
        let message = `The stack size cannot be more than 42. ${num} node(s) were generated.`;
        messageBox.innerHTML = message;
    }
    else {
        let message = `${num} node(s) were generated.`;
        messageBox.innerHTML = message;
    }
    loadNodes(num);
});

push.addEventListener(
    'click',
    (e) => {
        if (e.preventDefault) e.preventDefault();
        messageBox.innerHTML = "";
        if (dragZone.firstElementChild) {
            messageBox.innerHTML = `${dragZone.firstElementChild.innerHTML} was pushed successfully.`;
            dropTarget.insertBefore(dragZone.firstElementChild, dropTarget.firstElementChild);
            stackSize.innerHTML = (parseInt(stackSize.innerHTML) - 1).toString();
            if (parseInt(stackSize.innerHTML) == 0) messageBox.innerHTML = ` <b>Stack Overflow</b> because the stack is full.`;
            for (let i = 0; i < dropTarget.childNodes.length; i++) {
                dropTarget.childNodes[i].className = "";
                dropTarget.childNodes[i].className += "stack-element";
            }
        } else {
            let message = "There are no nodes to push. ";
            if (parseInt(stackSize.innerHTML) == 0) messageBox.innerHTML += ` <b>Stack Overflow</b> because the stack is full.`;
            messageBox.append(message);
        }
    }
);

pop.addEventListener(
    'click',
    e => {
        if (e.preventDefault) e.preventDefault();
        messageBox.innerHTML = "";
        if (dropTarget.firstElementChild) {
            dropTarget.firstElementChild.className += " not-in-stack";
            messageBox.innerHTML = `${dropTarget.firstElementChild.innerHTML} was popped successfully.`;
            dragZone.insertBefore(dropTarget.firstElementChild, dragZone.firstElementChild);
            stackSize.innerHTML = (parseInt(stackSize.innerHTML) + 1).toString();
            if (parseInt(stackSize.innerHTML) == 42) messageBox.innerHTML += ` <b>Stack Underflow</b> because the stack is empty.`;
        } else {
            if (parseInt(stackSize.innerHTML) == 42) messageBox.innerHTML += ` <b>Stack Underflow</b> because the stack is empty.`;
            let message = `Stack is empty. It has ${dropTarget.childElementCount} node(s) therefore you cannot pop any node`;
            messageBox.append(message);
        }
    }
);

peek.addEventListener(
    'click',
    e => {
        if (e.preventDefault) e.preventDefault();
        messageBox.innerHTML = "";
        if (dropTarget.firstElementChild) {
            let result = dropTarget.firstElementChild.cloneNode(true);
            result.className += " peek";
            let message = "This is on top of the stack.";
            messageBox.append(message);
            messageBox.append(result);
        } else {
            let message = `Stack is empty. There are no nodes`;
            messageBox.append(message);
        }
    }
);

reset.addEventListener(
    'click',
    e => {
        const size = dropTarget.childElementCount;
        messageBox.innerHTML = "";
        if (dropTarget.firstElementChild) {
            for (let i = 0; i < size; i++) {
                if (dropTarget.firstElementChild) {
                    dropTarget.firstElementChild.className += " not-in-stack";
                    dragZone.insertBefore(dropTarget.firstElementChild, dragZone.firstElementChild);
                    stackSize.innerHTML = "42";
                    messageBox.innerHTML = "reset successful."
                }
            }
        } else {
            let message = "Stack is already empty, can't reset it.";
            messageBox.append(message);
        }
    }
);