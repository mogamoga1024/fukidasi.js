
/**
 * elTargetの吹き出しを表示する
 * 
 * ・（大前提）elTargetはposition:relativeであること！
 * 
 * ・矢印の方向はoptionsにてtrianglePositionプロパティで指定できる。
 *   値は"top"|"left"|"right"|"bottom"、デフォルトは"top"
 * 
 * @param {HTMLElement} elTarget 吹き出しの対象
 * @param {string} text 表示する文字列
 * @param {object} options 吹き出しのCSS設定
 */
const fukidasi = (function() {
    let canExecuteMap = new WeakMap();
    const zIndexMax = 2147483647;
    
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

        const elFukidasi = document.createElement("div");
        const elTriangle = document.createElement("div");
        Object.assign(elFukidasi.style, {
            padding: "8px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            backgroundColor: "black",
            userSelect: "none",
            zIndex: zIndexMax,
        });

        // カスタムCSSの反映
        Object.assign(elFukidasi.style, options);
        
        elFukidasi.innerText = text;

        elFukidasi.style.position = "fixed";
        elFukidasi.style.visibility = "hidden";
        elTarget.appendChild(elFukidasi);

        const strWidth = getComputedStyle(elFukidasi).width;
        elFukidasi.style.width = strWidth;

        let trianglePosition = "top";
        if (options?.hasOwnProperty("trianglePosition")) {
            trianglePosition = options.trianglePosition;
        }
        let triangleBase = 40;
        if (trianglePosition === "top" || trianglePosition === "bottom") {
            triangleBase = Math.min(triangleBase, elFukidasi.clientWidth / 2);
        }
        else if (trianglePosition === "left" || trianglePosition === "rigth") {
            triangleBase = Math.min(triangleBase, elFukidasi.clientHeight / 2);
        }
        const strTriangleBase = `${triangleBase}px`;
        const strTriangleHeight = `${triangleBase / 2}px`;

        if (trianglePosition === "top") {
            elFukidasi.style.top = `calc(${elTarget.clientHeight}px + ${strTriangleHeight} / 2)`;
            elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                top: `calc(-${strTriangleHeight} + 1px)`,
                left: `calc((${elFukidasi.clientWidth}px - ${strTriangleBase}) / 2)`,
                borderLeft: `calc(${strTriangleBase} / 2) solid transparent`,
                borderRight: `calc(${strTriangleBase} / 2) solid transparent`,
                borderBottom: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
                zIndex: zIndexMax,
            });
        }
        else if (trianglePosition === "bottom") {
            elFukidasi.style.bottom = `calc(${elTarget.clientHeight}px + ${strTriangleHeight} / 2)`;
            elFukidasi.style.left = `calc((100% - ${elFukidasi.clientWidth}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                bottom: `calc(-${strTriangleHeight} + 1px)`,
                left: `calc((${elFukidasi.clientWidth}px - ${strTriangleBase}) / 2)`,
                borderLeft: `calc(${strTriangleBase} / 2) solid transparent`,
                borderRight: `calc(${strTriangleBase} / 2) solid transparent`,
                borderTop: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
                zIndex: zIndexMax,
            });
        }
        else if (trianglePosition === "left") {
            elFukidasi.style.left = `calc(${elTarget.clientWidth}px + ${strTriangleHeight} / 2)`;
            elFukidasi.style.top = `calc((100% - ${elFukidasi.clientHeight}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                top: `calc((${elFukidasi.clientHeight}px - ${strTriangleBase}) / 2)`,
                left: `calc(-${strTriangleHeight} + 1px)`,
                borderTop: `calc(${strTriangleBase} / 2) solid transparent`,
                borderBottom: `calc(${strTriangleBase} / 2) solid transparent`,
                borderRight: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
                zIndex: zIndexMax,
            });
        }
        else if (trianglePosition === "right") {
            elFukidasi.style.right = `calc(${elTarget.clientWidth}px + ${strTriangleHeight} / 2)`;
            elFukidasi.style.top = `calc((100% - ${elFukidasi.clientHeight}px) / 2)`;
            Object.assign(elTriangle.style, {
                position: "absolute",
                top: `calc((${elFukidasi.clientHeight}px - ${strTriangleBase}) / 2)`,
                right: `calc(-${strTriangleHeight} + 1px)`,
                borderTop: `calc(${strTriangleBase} / 2) solid transparent`,
                borderBottom: `calc(${strTriangleBase} / 2) solid transparent`,
                borderLeft: `${strTriangleHeight} solid ${elFukidasi.style.backgroundColor}`,
                zIndex: zIndexMax,
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

