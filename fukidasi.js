
/**
 * elTargetの吹き出しを表示する
 * 
 * ・（大前提）elTargetはposition:relativeであること！
 * 
 * ・吹き出しの三角形の幅と高さはoptionsで
 *   triangleBase: "40px", triangleHeight: "20px"
 *   のように指定可能
 * 
 * @param {HTMLElement} elTarget 吹き出しの対象
 * @param {string} text 表示する文字列
 * @param {object} options 吹き出しのCSS設定
 */
const fukidasi = (function() {
    let canExecuteMap = new WeakMap();
    
    /**
     * @param {HTMLElement} elTarget
     * @param {string} text
     * @param {object} options
     */
    return function(elTarget, text, options) {
        if (!canExecuteMap.has(elTarget)) {
            canExecuteMap.set(elTarget, true);
        }
        if (!canExecuteMap.get(elTarget)) {
            return;
        }
        canExecuteMap.set(elTarget, false);

        let strTriangleBase = "40px";
        let strTriangleHeight = "20px";
        // let trianglePosition = "top";
        // let trianglePosition = "bottom";
        let trianglePosition = "left";
        if (options?.hasOwnProperty("triangleBase")) {
            strTriangleBase = options.triangleBase;
        }
        if (options?.hasOwnProperty("triangleHeight")) {
            strTriangleHeight = options.triangleHeight;
        }
        if (options?.hasOwnProperty("trianglePosition")) {
            trianglePosition = options.trianglePosition;
        }

        const elFukidasi = document.createElement("div");
        const elTriangle = document.createElement("div");
        Object.assign(elFukidasi.style, {
            padding: "8px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            userSelect: "none",
        });

        if (trianglePosition === "top") {
            elFukidasi.style.top = `calc(${elTarget.clientHeight}px + ${strTriangleHeight} / 2)`;
        }
        else if (trianglePosition === "left") {

        }
        else if (trianglePosition === "right") {

        }
        else if (trianglePosition === "bottom") {
            elFukidasi.style.bottom = `calc(${elTarget.clientHeight}px + ${strTriangleHeight} / 2)`;
        }

        // カスタムCSSの反映
        Object.assign(elFukidasi.style, options);
        
        elFukidasi.innerText = text;

        elFukidasi.style.position = "fixed";
        elFukidasi.style.visibility = "hidden";
        elTarget.appendChild(elFukidasi);

        const strWidth = getComputedStyle(elFukidasi).width;
        elFukidasi.style.width = strWidth;

        if (trianglePosition === "top") {
            elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                top: `calc(-${strTriangleHeight} + 1px)`,
                left: `calc((${elFukidasi.clientWidth}px - ${strTriangleBase}) / 2)`,
                borderLeft: `calc(${strTriangleBase} / 2) solid transparent`,
                borderRight: `calc(${strTriangleBase} / 2) solid transparent`,
                borderBottom: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
            });
        }
        else if (trianglePosition === "bottom") {
            elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                top: `calc(${elFukidasi.clientHeight}px - 1px)`,
                left: `calc((${elFukidasi.clientWidth}px - ${strTriangleBase}) / 2)`,
                borderLeft: `calc(${strTriangleBase} / 2) solid transparent`,
                borderRight: `calc(${strTriangleBase} / 2) solid transparent`,
                borderTop: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
            });
        }

        elTarget.removeChild(elFukidasi);
        elFukidasi.style.position = "absolute";
        elFukidasi.style.visibility = "";

        // const fadeOutDuration = 2000;
        // elFukidasi.animate([
        //     {
        //         visibility: "visible",
        //         opacity: 1
        //     },
        //     {
        //         visibility: "hidden",
        //         opacity: 0
        //     }
        // ], {
        //     duration: fadeOutDuration,
        //     easing: "ease-in",
        //     fill: "forwards"
        // });

        elTarget.appendChild(elFukidasi);
        elFukidasi.appendChild(elTriangle);

        // setTimeout(() => {
        //     elTarget.removeChild(elFukidasi);
        //     canExecuteMap.set(elTarget, true);
        // }, fadeOutDuration);
    }
})();

