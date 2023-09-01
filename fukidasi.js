
let canCopyButtonClick = true;

function onClickCopyButton() {
    if (!canCopyButtonClick) {
        return;
    }
    canCopyButtonClick = false;
    const $copyMessage = document.querySelector("#copy-message");
    $copyMessage.classList.add("display-copy-message");
    timer = setTimeout(() => {
        $copyMessage.classList.remove("display-copy-message");
        canCopyButtonClick = true;
    }, 2000);
}

