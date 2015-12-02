/**
 * Created by jh3r on 1/20/2015.
 */
(function(window){
    function getEvent(){
        if(document.all){
            return window.event;
        }
        var func = getEvent.caller;
        while(func != null){
            var arg0 = func.arguments[0];
            if(arg0){
                if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    }

    function confirmClose(){
        if(window.event){
            window.event.returnValue = '您确实要关闭飞聊吗？';
        }else{
            getEvent().preventDefault(); //for firefox
        }
    }

    function on_page_loaded(){
        try{
            if(!window.onbeforeunload){
                window.onbeforeunload = confirmClose;
            }
        }catch (e){}
    }

    window.on_page_loaded = on_page_loaded;
})(window);