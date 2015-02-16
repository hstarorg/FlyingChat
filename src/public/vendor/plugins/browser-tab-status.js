(function(window) {
    var hidden = 'hidden';
 
    // Standards:
    if (hidden in document)
        document.addEventListener('visibilitychange', onchange);
    else if ((hidden = 'mozHidden') in document)
        document.addEventListener('mozvisibilitychange', onchange);
    else if ((hidden = 'webkitHidden') in document)
        document.addEventListener('webkitvisibilitychange', onchange);
    else if ((hidden = 'msHidden') in document)
        document.addEventListener('msvisibilitychange', onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;
 
    function onchange (evt) {
        var v = 'visible', h = 'hidden', status,
            evtMap = { 
                focus:v, 
                focusin:v, 
                pageshow:v, 
                blur:h, 
                focusout:h, 
                pagehide:h 
            };
 
        evt = evt || window.event;
        if (evt.type in evtMap){
            status = evtMap[evt.type];
            window.pageIsActive = (status === 'visible');
        }else{        
            status = this[hidden] ? "hidden" : "visible";
        }
        window.pageIsActive = (status === 'visible');
        if(window.pageActiveChanged && typeof window.pageActiveChanged === 'function'){
            window.pageActiveChanged.call();
        }
    }
    // set the initial state
    onchange({type:(document.visibilityState == "visible") ? "focus" : "blur"});        
})(window);