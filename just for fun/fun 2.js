document.querySelector('form').addEventListener('click', e => {
    if (e.target.matches('input[type="radio"]')) {
        const checked = document.querySelector('#vegetarian').checked;
        document.querySelectorAll('.meat').forEach(chk => {
            chk.disabled = checked;
            chk.checked = false;
        });
    }
});

const calories = {
    rice: 204,
    bread: 140,
    chicken: 147,
    beef: 282,
    carrots: 150,
    beans: 70
};

function myFunction() {

    const food = [];
    const veg = [];
    let sum = 0;

    document.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        if (chk.checked) {
            food.push(chk.value);
            if (chk.classList.contains('veg')) {
                veg.push(chk.value);
            }
            sum += (calories[chk.value] || 0);
        }
    });

    console.log(sum); /*sum of array not working */
    alert(food);
    if (veg.length < 2) {
        alert('two vegs are recommendeded');
    }
}