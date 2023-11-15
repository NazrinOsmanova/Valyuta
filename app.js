let input1 = document.querySelector("#inp1");
let input2 = document.querySelector("#inp2");
let noqteSayi1 = 0;
let noqteSayi2 = 0;
let noqtedenSonra1 = 0;
let noqtedenSonra2 = 0;
let text1 = "";
let text2 = "";
let input1Changed = false;
let input2Changed = false;
let valyuta1 = "RUB";
let valyuta2 = "USD";
document.querySelector("#inp1").value = 1;

function funk2(input, noqteSayi, noqtedenSonra) {
    let text = "";
    for (let i = 0; i < input.value.length; i++) {
        if (!((input.value[i] >= '0' && input.value[i] <= '9') || input.value[i] === ".")) {
            input.value = input.value.slice(0, -1);
        }

        if (input.value[i] === '.') {
            noqteSayi++;
            if (noqteSayi > 1) {
                input.value = input.value.slice(0, -1);
                noqteSayi--;
                continue;
            }

            if (noqteSayi === 1) {
                noqtedenSonra = 0;
            }
        }

        if (noqteSayi === 1 && noqtedenSonra < 5 && input.value[i] >= '0' && input.value[i] <= '9') {
            noqtedenSonra++;
            text += input.value[i];
        }

        if (noqtedenSonra > 4) {
            input.value = input.value.slice(0, -1);
        }
    }
}

input1.addEventListener("input", function () {
    funk2(input1, noqteSayi1, noqtedenSonra1);
});

input2.addEventListener("input", function () {
    funk2(input2, noqteSayi2, noqtedenSonra2);
});

function funk1(a) {
    document.querySelectorAll(`section .container .boxes ${a} .items .item`).forEach(f => {
        f.addEventListener("click", function () {
            if (!f.classList.contains("myClass")) {
                document.querySelectorAll(`section .container .boxes ${a} .items .item`).forEach(e => {
                    e.classList.remove("myClass");
                });
                f.classList.add("myClass");
            };
            if (a == ".box:first-child") {
                document.querySelector("section .container .boxes .box:first-child .result p span:nth-child(2)").textContent = f.textContent
                document.querySelector("section .container .boxes .box:last-child .result p span:nth-child(4)").textContent = f.textContent
            }
            else if (a == ".box:last-child") {
                document.querySelector("section .container .boxes .box:first-child .result p span:nth-child(4)").textContent = f.textContent
                document.querySelector("section .container .boxes .box:last-child .result p span:nth-child(2)").textContent = f.textContent
            };
        });
    });
};

funk1(".box:first-child");
funk1(".box:last-child");

fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/RUB`)
    .then(res => res.json())
    .then(data => {
        document.querySelector("#inp2").value = (document.querySelector("#inp1").value * data.conversion_rates.USD).toFixed(4);
        document.querySelector(".boxes .box:first-child .result p span:nth-child(3)").innerText = (data.conversion_rates.USD).toFixed(4);;
        document.querySelector(".boxes .box:last-child .result p span:nth-child(3)").innerText = (1 / data.conversion_rates.USD).toFixed(4);;
    });

let funk3 = () => {
    if (input1Changed) {
        fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/${valyuta1}`)
            .then(res => res.json())
            .then(data => {
                document.querySelector("#inp2").value = (document.querySelector("#inp1").value * data.conversion_rates[valyuta2]).toFixed(4);
            });
    };
};

let funk4 = () => {
    if (input2Changed) {
        fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/${valyuta2}`)
            .then(res => res.json())
            .then(data => {
                document.querySelector("#inp1").value = (document.querySelector("#inp2").value * data.conversion_rates[valyuta1]).toFixed(4);
            });
    }
};

document.querySelectorAll(".boxes .box:first-child .item").forEach(f => {
    f.addEventListener("click", function () {
        valyuta1 = f.innerText;
        if (input1Changed) {
            funk3();
        }
        if (input2Changed) {
            funk4();
        }
        if (!input2Changed && !input1Changed) {
            fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/${valyuta1}`)
                .then(res => res.json())
                .then(data => {
                    document.querySelector("#inp2").value = (document.querySelector("#inp1").value * data.conversion_rates[valyuta2]).toFixed(4);
                    document.querySelector(".boxes .box:first-child .result p span:nth-child(3)").innerText = (data.conversion_rates[valyuta2]).toFixed(4);
                    document.querySelector(".boxes .box:last-child .result p span:nth-child(3)").innerText = (1 / data.conversion_rates[valyuta2]).toFixed(4);
                });
        };
    });
});

document.querySelectorAll(".boxes .box:last-child .item").forEach(f => {
    f.addEventListener("click", function () {
        valyuta2 = f.innerText;
        if (input1Changed) {
            funk3();
        }
        if (input2Changed) {
            funk4();
        }
        if (!input2Changed && !input1Changed) {
            fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/${valyuta1}`)
                .then(res => res.json())
                .then(data => {
                    document.querySelector("#inp2").value = (document.querySelector("#inp1").value * data.conversion_rates[valyuta2]).toFixed(4);
                    document.querySelector(".boxes .box:first-child .result p span:nth-child(3)").innerText = (data.conversion_rates[valyuta2]).toFixed(4);
                    document.querySelector(".boxes .box:last-child .result p span:nth-child(3)").innerText = (1 / data.conversion_rates[valyuta2]).toFixed(4);
                });
        };
    });
});

document.querySelector("#inp1").addEventListener("input", function () {
    input1Changed = true;
    input2Changed = false;
    funk3();
});

document.querySelector("#inp2").addEventListener("input", function () {
    input2Changed = true;
    input1Changed = false;
    funk4();
});