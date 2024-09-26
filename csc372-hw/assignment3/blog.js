// expand images and show descriptions
const pics = document.querySelectorAll('img');

for (let index = 0; index < pics.length; index++) {
    const element = pics[index];
    element.addEventListener('click', expand);
}

function expand(event) {
    const clicked = event.currentTarget;
    const big = document.querySelector(".big");
    const describe = clicked.nextElementSibling;

    if (big) {
        big.classList.remove('big');
        big.classList.add('small');
        big.nextElementSibling.classList.remove('show');
    }

    clicked.classList.remove('small');
    clicked.classList.add('big');
    describe.classList.add('show');
}

// meal plan
let mealPlan = [];
let totalCost = 0;
const addbtn = document.querySelectorAll('.btn');

addbtn.forEach(button => {

    button.addEventListener('click', event => {

        const items = event.target.parentElement;
        const name = items.getAttribute('name');
        const price = parseFloat(items.getAttribute('price'));
        add(name, price);
    });
});


function add(name, price) {
    const exists = mealPlan.find(item => item.name === name);

    if (exists) {
        exists.quantity++;
    } else {
        mealPlan.push({ name: name, price: price, quantity: 1 });
    }

    update();
}

function decrease(name) {
    const item = mealPlan.find(item => item.name === name);

    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        remove(name);
    }

    update();
}

function increase(name) {
    const item = mealPlan.find(item => item.name === name);

    if (item) {
        item.quantity++;
    }

    update();
}

function remove(name) {
    mealPlan = mealPlan.filter(item => item.name !== name);

    update();
}

function update() {
    const plan = document.getElementById('planned');
    const displayCost = document.getElementById('total');
    total = 0
    plan.innerHTML = '';

    mealPlan.forEach(item => {
        const li = document.createElement('li');

        li.innerHTML = 
        `${item.name} - $${item.price} 
            <button class="decrease">-</button>
             Quantity: ${item.quantity}
             <button class="increase">+</button>
            <button class="delete">Delete</button>`;

        plan.appendChild(li);

        li.querySelector('.delete').addEventListener('click', () => remove(item.name));
        li.querySelector('.decrease').addEventListener('click', () => decrease(item.name));
        li.querySelector('.increase').addEventListener('click', () => increase(item.name));

        total += item.price * item.quantity;
    });

    displayCost.textContent = total;
}