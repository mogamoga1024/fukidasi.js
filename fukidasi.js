
/**
 * elTargetの吹き出しを表示する
 * 
 * ・（大前提）elTargetはposition:relativeであること！
 * 
 * ・吹き出しの位置はoptionsOrFukidasiPositionにてfukidasiPositionプロパティで指定できる。
 *   値は"top"|"left"|"right"|"bottom"、デフォルトは"bottom"
 *   もしくは"top"|"left"|"right"|"bottom"で直接指定できる。
 * 
 * @param {HTMLElement} elTarget 吹き出しの対象
 * @param {string} text 表示する文字列
 * @param {object|string} optionsOrFukidasiPosition 吹き出しのCSS設定 or 吹き出しの位置
 */
const fukidasi = (function() {
    let canExecuteMap = new WeakMap();
    const zIndexMax = 2147483647;
    
    /**
     * @param {HTMLElement} elTarget
     * @param {string} text
     * @param {object|string} optionsOrFukidasiPosition
     */
    return function(elTarget, text, optionsOrFukidasiPosition) {
        if (!canExecuteMap.has(elTarget)) {
            canExecuteMap.set(elTarget, true);
        }
        if (!canExecuteMap.get(elTarget)) {
            return;
        }
        canExecuteMap.set(elTarget, false);

        let fukidasiPosition = "bottom";
        let options = null;
        if (typeof optionsOrFukidasiPosition === "string") {
            fukidasiPosition = optionsOrFukidasiPosition;
        }
        else {
            options = optionsOrFukidasiPosition;
        }

        const elFukidasi = document.createElement("div");
        const elTriangle = document.createElement("div");
        Object.assign(elFukidasi.style, {
            padding: "8px",
            textAlign: "center",
            borderRadius: "5px",
            fontSize: "1rem",
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

        if (options?.hasOwnProperty("fukidasiPosition")) {
            fukidasiPosition = options.fukidasiPosition;
        }
        let triangleBase = 40;
        if (fukidasiPosition === "top" || fukidasiPosition === "bottom") {
            triangleBase = Math.min(triangleBase, elFukidasi.clientWidth / 2);
        }
        else if (fukidasiPosition === "left" || fukidasiPosition === "right") {
            triangleBase = Math.min(triangleBase, elFukidasi.clientHeight / 2);
        }
        const strTriangleBase = `${triangleBase}px`;
        const strTriangleHeight = `${triangleBase / 2}px`;

        if (fukidasiPosition === "top") {
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
        else if (fukidasiPosition === "bottom") {
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
        else if (fukidasiPosition === "left") {
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
        else if (fukidasiPosition === "right") {
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
        elFukidasi.appendChild(elTriangle);

        setTimeout(() => {
            elTarget.removeChild(elFukidasi);
            canExecuteMap.set(elTarget, true);
        }, fadeOutDuration);
    }
})();

