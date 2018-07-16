window.onload=function(){
        var map = new BMap.Map("container");
        // 创建地图实例  
        var point = new BMap.Point(108.95384, 34.229471);
        // 创建点坐标  
        map.centerAndZoom(point, 15);
        // 初始化地图，设置中心点坐标和地图级别  
        map.enableScrollWheelZoom(true);     
        //开启鼠标滚轮缩放
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
        // 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  
        //左上角，添加默认缩放平移控件
        var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, 
            type: BMAP_NAVIGATION_CONTROL_SMALL});
        //右上角，仅包含平移和缩放按钮
         
        /*缩放控件type有四种类型:
        BMAP_NAVIGATION_CONTROL_LARGE：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
    
        //添加控件和比例尺
        map.addControl(top_left_control);        
        map.addControl(top_left_navigation);     
        map.addControl(top_right_navigation);  

        //设置点的弹跳坐标--start--
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        //设置点的弹跳坐标--end-- 
   
       //添加文字标签
        var opts = {
          position : point,    // 指定文本标注所在的地理位置
          offset   : new BMap.Size(-60, 0)    //设置文本偏移量
        }
        var label = new BMap.Label("欢迎使用百度地图，祝您购物愉快~", opts);  // 创建文本标注对象
            label.setStyle({
                 color : "red",
                 fontSize : "10px",
                 height : "20px",
                 lineHeight : "20px",
                 fontFamily:"微软雅黑"
                
             });
        map.addOverlay(label); 


    //购物车相关代码
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {
                if (els[i].className === cls
                    || els[i].className.indexOf(cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls) >= 0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var cartTable = document.getElementById('cartTable');
    var tr = cartTable.children[1].rows;
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var selected = document.getElementById('selected');
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList');
    var deleteAll = document.getElementById('deleteAll');
    var close=document.getElementsByClassName('closing');

    //计算
    function getTotal() {
        var seleted = 0;
        var price = 0;
        var HTMLstr = '';
        for (var i = 0, len = tr.length; i < len; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                tr[i].className = 'on';
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
            }
            else {
                tr[i].className = '';
            }
        }

        selectedTotal.innerHTML = seleted;
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;

        if (seleted == 0) {
            foot.className = 'foot';
        }
    }


    //小计
    function getSubTotal(tr) {
        var tds = tr.cells;
        var price = parseFloat(tds[2].innerHTML);
        var count = parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal = parseFloat(price * count);
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    for (var i = 0 , len = checkInputs.length; i < len; i++) {
        checkInputs[i].onclick = function () {
            if (this.className === 'check-all check') {
                for (var j = 0; j < checkInputs.length; j++) {
                    checkInputs[j].checked = this.checked; //如果直接用true，则不能取消全选              
                }
            }
            if (this.checked == false) {
                for (var k = 0; k < checkAllInputs.length; k++) {
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal();
        }
    }

    selected.onclick = function () {
        if (foot.className == 'foot') {
            if (selectedTotal.innerHTML != 0) {
                foot.className = 'foot show';
            }
        }
        else {
            foot.className = 'foot';
        }
    }

    selectedViewList.onclick = function (e) {
        e = e || window.event;
        var el = e.srcElement||e.target;  //IE支持，指向触发事件的元素；火狐为e.target
        if (el.className == 'del') {
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    }

    for (var i = 0; i < tr.length; i++) {
        tr[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName('span')[1];
            switch (cls) {
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (val > 1) {
                        input.value = val - 1;
                    }
                    if (input.value <= 1) {
                        reduce.innerHTML = '';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break
                default :
                    break;
            }
            getTotal();
        }
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode
            var reduce = tr.getElementsByTagName('span')[1];
            if (isNaN(val) || val < 1) {
                val = 1;
            }
            this.value = val;
            if (val <= 1) {
                reduce.innerHTML = '';
            }
            else {
                reduce.innerHTML = '-';
            }
            getSubTotal(tr);
            getTotal();
        }
    }

    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != '0') {
            var conf = confirm('确定删除吗？');
            if (conf) {
                for (var i = 0; i < tr.length; i++) {
                    var input = tr[i].getElementsByTagName('input')[0];
                    if (input.checked) {
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }
    }

    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();  //设置初始状态为全选

    close[0].onclick=function(){
        confirm("确定结算吗？");
    }


    waterfall("main","pin");

    var dataInt={"data":[{"src":"p_00.jpg"},{"src":"p_01.jpg"},{"src":"p_02.jpg"},{"src":"p_03.jpg"},{"src":"p_04.jpg"},{"src":"p_05.jpg"},{"src":"p_06.jpg"},{"src":"p_07.jpg"},{"src":"p_08.jpg"},{"src":"p_09.jpg"},{"src":"p_10.jpg"},{"src":"p_11.jpg"},{"src":"p_12.jpg"},{"src":"p_13.jpg"},{"src":"p_14.jpg"},{"src":"p_15.jpg"},{"src":"p_16.jpg"},{"src":"p_17.jpg"},{"src":"p_18.jpg"},{"src":"p_19.jpg"},{"src":"p_20.jpg"}]}//json数据构造
    
    window.onscroll=function(){
        if(checkScrollSlide()){
            var oParent=document.getElementById("main");
            //将数据块渲染到当前页面的尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement("div");
                oPin.className="pin";
                oParent.appendChild(oPin);
                var oBox=document.createElement("div");
                oBox.className="box";
                oPin.appendChild(oBox);
                var oImg=document.createElement("img");
                oImg.src="./iframe_img/"+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall("main","pin");
            };

        }





//获取所有的main下class为box的元素
    function waterfall(parent,box){
        var oParent=document.getElementById(parent);
        var oBoxs=getByClass(oParent,box);       
        var oBoxW=oBoxs[0].offsetWidth;//每个box宽度
               
        //设置main页面为固定宽度
        oParent.style.cssText="width:"+1190+"px;margin:0 auto;";
        //计算整个页面显示的列数(页面宽度/box宽度)
        var cols=Math.floor(parseInt(oParent.style.width)/oBoxW);
        

        //存放每一列高度的数组
        var hArr=new Array();
        for(i=0;i<oBoxs.length;i++){
            if(i<cols){hArr.push(oBoxs[i].offsetHeight);}
            else{
            var minH=Math.min.apply(null,hArr);
            //apply改变了参数的传入形式，本来min方法传入的是单个参数，现在可以传数组了
            var index=getMinhIndex(hArr,minH);
            // console.log(index);
            oBoxs[i].style.position="absolute";
            oBoxs[i].style.top=minH+"px";
            oBoxs[i].style.left=oBoxW*index+"px";
            //oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
            hArr[index]+=oBoxs[i].offsetHeight;
            //寻找各列之中所有元素高度之和的最小者，并将新的元素添加到该列上
            }
                
        }

    }

    //根据class获取元素
    function getByClass(parent,clsName){
        var boxArr=new Array();//定义数组用来容纳获取到的元素
        oElements=parent.getElementsByTagName("*");//获取到父元素下所有的标签元素
        for(var i=0;i<oElements.length;i++){
            if(oElements[i].className==clsName){
                boxArr.push(oElements[i]);//遍历筛选指定class名字的元素并放进数组容器
            }
        }
        return boxArr;

    }
    function getMinhIndex(arr,val){
        for(var i in arr){
            if(arr[i]==val){return i;}
        }
    }
    //检测是否具备了滚动加载数据块的条件
    function checkScrollSlide(){
        var oParent=document.getElementById("main");
        var aPin=getByClass(oParent,"pin");
        var lastBoxH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);
        //页面最后一个图片加载一半时触发滚动事件
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//解决兼容性问题
        var height=document.documentElement.clientHeight||document.body.clientHeight;//页面高度
        return(lastBoxH<scrollTop+height)?true:false;//达到指定高度

    }
}
