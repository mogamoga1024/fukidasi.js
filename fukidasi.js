
/**
 * elTargetの吹き出しを表示する。
 * elTargetはposition: relativeであること。
 * @param {HTMLElement} elTarget 吹き出しの対象
 * @param {string} text 表示する文字列
 */
const fukidasi = (function() {
    let canExecuteMap = new WeakMap();
    
    /**
     * @param {HTMLElement} elTarget
     * @param {string} text
     */
    return function(elTarget, text) {
        if (!canExecuteMap.has(elTarget)) {
            canExecuteMap.set(elTarget, true);
        }
        if (!canExecuteMap.get(elTarget)) {
            return;
        }
        canExecuteMap.set(elTarget, false);

        const elFukidasi = document.createElement("div");
        Object.assign(elFukidasi.style, {
            top: "60px",
            left: "0",
            padding: "8px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            userSelect: "none",
        });
        
        elFukidasi.innerText = text;

        elFukidasi.style.position = "fixed";
        elFukidasi.style.visibility = "hidden";
        elTarget.appendChild(elFukidasi);

        // debugger
        const strWidth = getComputedStyle(elFukidasi).width;
        elFukidasi.style.width = strWidth;
        elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;

        elTarget.removeChild(elFukidasi);
        elFukidasi.style.position = "absolute";
        elFukidasi.style.visibility = "";

        elTarget.appendChild(elFukidasi);
    }
})();

