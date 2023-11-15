// let input1Changed = false;
// let input2Changed = false;
// let valyuta1 = "RUB";
// let valyuta2 = "USD";

// const updateInputValues = (rate) => {
//     document.querySelector("#inp2").value = (document.querySelector("#inp1").value * rate).toFixed(4);
// };

// const fetchExchangeRate = (from, to, callback) => {
//     fetch(`https://v6.exchangerate-api.com/v6/6e13f433f35a41f6bea94393/latest/${from}`)
//         .then(res => res.json())
//         .then(data => {
//             callback(data.conversion_rates[to]);
//         });
// };

// const funk3 = () => {
//     if (input1Changed) {
//         fetchExchangeRate(valyuta1, valyuta2, updateInputValues);
//     }
// };

// const funk4 = () => {
//     if (input2Changed) {
//         fetchExchangeRate(valyuta2, valyuta1, (rate) => {
//             document.querySelector("#inp1").value = (document.querySelector("#inp2").value * rate).toFixed(4);
//         });
//     }
// };

// const handleCurrencyClick = (currency, isInput1) => {
//     if (isInput1) {
//         valyuta1 = currency;
//         funk3();
//     } else {
//         valyuta2 = currency;
//         funk4();
//     }
// };

// document.querySelectorAll(".boxes .box:first-child .item, .boxes .box:last-child .item").forEach(f => {
//     f.addEventListener("click", function () {
//         const isInput1 = this.parentNode.classList.contains("box:first-child");
//         handleCurrencyClick(f.innerText, isInput1);
//     });
// });

// document.querySelector("#inp1").addEventListener("input", function () {
//     input1Changed = true;
//     input2Changed = false;
//     funk3();
// });

// document.querySelector("#inp2").addEventListener("input", function () {
//     input2Changed = true;
//     input1Changed = false;
//     funk4();
// });





let input1 = document.querySelector("#inp1");
let input2 = document.querySelector("#inp2");
let noqteSayi1 = 0;
let noqteSayi2 = 0;
let noqtedenSonra1 = 0;
let noqtedenSonra2 = 0;
let text1 = "";
let text2 = "";

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

document.querySelector("#inp1").value = 1;

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