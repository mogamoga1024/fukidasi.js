
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

        // elFukidasiのサイズを計測するために一旦DOMに追加する
        elFukidasi.style.position = "fixed";
        elFukidasi.style.visibility = "hidden";
        elTarget.appendChild(elFukidasi);

        // elFukidasiのサイズを計測し、elTargetの中央に配置されるようにleftなどを設定する
        const strWidth = getComputedStyle(elFukidasi).width;
        elFukidasi.style.width = strWidth;
        elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;

        // サイズの計測のために追加したelFukidasiをDOMから削除し、
        // 追加するときに変えたプロパティを戻す
        elTarget.removeChild(elFukidasi);
        elFukidasi.style.position = "absolute";
        elFukidasi.style.visibility = "";

        const fadeOutDuration = 2000;
        elFukidasi.animate([
            {
                visibility: "visible",
                opacity: 1
            },
            {
                visibility: "hidden",
                opacity: 0
            }
        ], {
            duration: fadeOutDuration,
            easing: "ease-in",
            fill: "forwards"
        });

        elTarget.appendChild(elFukidasi);

        setTimeout(() => {
            elTarget.removeChild(elFukidasi);
            canExecuteMap.set(elTarget, true);
        }, fadeOutDuration);
    }
})();

