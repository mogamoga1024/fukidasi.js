
/**
 * targetの吹き出しを表示する。
 * targetはposition: relativeであること。
 * @param {HTMLElement} target 吹き出しの対象
 * @param {string} text 表示する文字列
 */
const fukidasi = (function() {
    let canExecute = true;
    
    const elFukidasi = document.createElement("div");
    Object.assign(elFukidasi.style, {
        position: "absolute",
        // width: "100px",
        height: "40px",
        top: "60px",
        left: "calc((100% - 100px) / 2)",
        fontSize: "1.2rem",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        color: "white",
        backgroundColor: "black",
        userSelect: "none",
    });

    /**
     * @param {HTMLElement} target
     * @param {string} text
     */
    return function(target, text) {
        if (!canExecute) {
            return;
        }
        canExecute = false;
        
        // todo

        elFukidasi.innerText = text;

        target.appendChild(elFukidasi);
    }
})();

