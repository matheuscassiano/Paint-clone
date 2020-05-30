document.addEventListener('DOMContentLoaded', () => { 
    
    let paint = {
        active: false,
        moving: false,
        pos: {x: 0, y: 0},
        posBefore: null,
        color: 'black',
        size: 1
    }

    const screen = document.querySelector('#screen');
    const context = screen.getContext('2d');
    
    const colorButton = document.querySelectorAll('.colors button');
    const plusButton = document.querySelector('#plus');
    const minusButton = document.querySelector('#minus');
    const sizeIndicator = document.querySelector('#paintSize');
    const saveButton = document.querySelector('#save');


    screen.width = 700;
    screen.height = 500;
    context.fillStyle = 'blue';
    context.clearRect(0, 0, 700, 500);

    
    const drawLine = (line) =>{
        context.beginPath();
        context.moveTo(line.posBefore.x, line.posBefore.y);
        context.lineTo(line.pos.x, line.pos.y);
        context.stroke();
        context.strokeStyle = line.color;
        context.lineWidth = line.size;
    }

    screen.onmousedown = (e) => {paint.active = true};
    screen.onmouseup = (e) => {paint.active = false};
    screen.onmousemove = (e) => {
        let rect = screen.getBoundingClientRect();

        paint.pos.x = e.clientX - rect.left
        paint.pos.y = e.clientY - rect.top
        paint.moving = true;
    }

    document.body.onkeyup = (e) => { 
        if (e.keyCode == 32) {
            console.log('space')
        }
    }

    colorButton.forEach(button => {
        button.style.backgroundColor = button.id;
        button.innerHTML = '';
        button.addEventListener('click', () => {
            paint.color = button.id;
        })
    })

    plusButton.addEventListener('click', () => {
        paint.size += 1;
        sizeIndicator.innerHTML = paint.size;
        console.log(paint.size);
    })

    minusButton.addEventListener('click', () => {
        paint.size -= 1;
        sizeIndicator.innerHTML = paint.size;
        console.log(paint.size);
    })

    saveButton.addEventListener('click', () => {
        let image = screen.toDataURL('image/png');
        saveButton.href=image;
    })

    const cicle = () => {
        if (paint.active && paint.moving && paint.posBefore) {
            drawLine({pos: paint.pos, posBefore: paint.posBefore, color: paint.color, size: paint.size});
            paint.moving = false;
        }
        paint.posBefore = {x: paint.pos.x, y: paint.pos.y}

        setTimeout(cicle, .00001);
    }

    cicle();
})