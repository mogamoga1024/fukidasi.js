
const fukidasi = (function() {
    let canExecute = true;

    return function(text) {
        if (!canExecute) {
            return;
        }
        canExecute = false;
        
        alert(text);
    }
})();

