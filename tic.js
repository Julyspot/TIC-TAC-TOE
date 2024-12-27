let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#Reset");
let new_btn = document.querySelector("#new");
let message = document.querySelector("#message");
let turn0 = true;

const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const reset = () => {
    turn0 = true;
    enable();
    message.innerText = "Game on!";

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        if (turn0) {
            box.innerText = "O";
            box.style.color="red";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color="blue";
            turn0 = true;
        }
        checkwinner();
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("highlight");
    }
};

const checkwinner = () => {
    for (let pattern of winning) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                message.innerText = `Winner is ${pos1val}`;
                boxes[pattern[0]].classList.add("highlight");
                boxes[pattern[1]].classList.add("highlight");
                boxes[pattern[2]].classList.add("highlight");
                disableboxes();
                return;
            }
        }
    }

    if ([...boxes].every((box) => box.innerText !== "")) {
        message.innerText = "It's a draw!";
        disableboxes();
    }
};

reset_btn.addEventListener("click", reset);
new_btn.addEventListener("click", reset);
