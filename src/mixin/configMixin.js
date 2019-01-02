export default {
    methods: {
        validation (el, txt) {
            var ele = creatTipsEle();
            var parent = el.parentNode;
            var tips = document.getElementById("verificationTips");

            if(parent.style.position != 'absolute' || parent.style.position != 'fixed'){
                parent.style.position = 'relative';
            };
            if(txt == "true" && tips) {
                tips.remove(0);
                return;
            }else if(txt != "true") {
                ele.innerHTML = txt;
            }

            if (tips) tips.remove(0);
            parent.insertBefore(ele, el.nextSibling);
            function creatTipsEle(){
                var ele = document.createElement("p");
                ele.id = "verificationTips";
                ele.style.color = "#f00";
                ele.style.margin = "0";
                ele.style.padding = "0";
                ele.style.lineHeight = "1.0";
                ele.style.fontSize = "14px";
                ele.style.position = "absolute";
                ele.style.left = '0';
                ele.style.bottom = '-16px';
                ele.style.width = '200%';
                return ele;
            }
        }
    }
}