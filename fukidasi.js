
/**
 * elTargetの吹き出しを表示する。
 * elTargetはposition: relativeであること。
 * @param {HTMLElement} elTarget 吹き出しの対象
 * @param {string} text 表示する文字列
 */
const fukidasi = (function() {
    let canExecute = true;
    
    const elFukidasi = document.createElement("div");
    Object.assign(elFukidasi.style, {
        position: "absolute",
        display: "inline-block",
        height: "40px",
        top: "60px",
        fontSize: "1.2rem",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        color: "white",
        backgroundColor: "black",
        userSelect: "none",
    });

    /**
     * @param {HTMLElement} elTarget
     * @param {string} text
     */
    return function(elTarget, text) {
        if (!canExecute) {
            return;
        }
        canExecute = false;
        
        // todo

        elFukidasi.innerText = text;

        elFukidasi.style.visibility = "hidden";
        document.body.appendChild(elFukidasi);

        // debugger
        elFukidasi.style.width = `${elFukidasi.clientWidth}px`;
        elFukidasi.style.padding = "0 16px";
        elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;

        document.body.removeChild(elFukidasi);
        elFukidasi.style.visibility = "";

        elTarget.appendChild(elFukidasi);
    }
})();

