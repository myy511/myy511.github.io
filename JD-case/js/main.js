 window.onload = function () {

            //导航栏切换~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            var menu=document.getElementById("menu");
            var Liss = menu.getElementsByTagName("li");
          
                     
            for (i = 0; i < Liss.length; i++) {
                                  
                Liss[i].onmouseover = function () {               
                this.className = "lihover";
                }
                Liss[i].onmouseout = function () {
                this.className = "";
                }
            }

            //广告滑出效果
            var ab=document.getElementById("ab");
            var ab_slider=document.getElementById("ab_slider");
            ab.onmouseover=function(){
                ab_slider.style.display="block";
            }
            ab.onmouseout=function(){
                ab_slider.style.display="none";
            }

            //轮播器切换效果~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            var lunbo=document.getElementById('lunbo'),
                pic=document.getElementById('pic'),
                pics=pic.getElementsByTagName('li'),
                list=document.getElementById('button').getElementsByTagName('i'),
                prev=document.getElementById('prev'),
                next=document.getElementById('next')

                index=0,
                timer=null;
            
            //定义图片切换函数
            function changPic(num){
          
                 pic.style.top= -num*343+"px";
                 for (var i = 0; i < list.length; i++) {
                 //list[i].style.display='none';
                 list[i].className='';
                };
                //pics[num].style.display='block';
                 list[num].className='on';
               
                }

            //定义并调用自动切换函数
            function autoPlay(){
                index++;
                if(index>=list.length){
                index=0;
            };
                changPic(index);
            }
            timer=setInterval(autoPlay,2000);
            // 鼠标划过整个容器时停止自动播放
            lunbo.onmouseover=function(){
             clearInterval(timer);
             };
            // 鼠标离开整个容器时继续播放至下一张
             lunbo.onmouseout=function(){
              timer=setInterval(autoPlay,2000);
             };
             // 遍历所有数字导航实现划过切换至对应的图片
            for (var j = 0; j < list.length; j++) {
             list[j].id=j;
             list[j].onmouseover=function(){
              changPic(this.id);
              index=this.id;
              // clearInterval(timer);
            };             
         }; 

            //前后按钮实现图片切换
            prev.onclick=function(){
                if (index == 0) {
                    index = 7;
                }
                else {
                    index -= 1;
                }
                changPic(index);
            };
            next.onclick=function(){
                if (index == 7) {
                    index = 0;
                }
                else {
                    index += 1;
                }
                changPic(index);
            };

             

            //右侧tab切换
            
            var tb=document.getElementById("tab"),
                tbb=tb.getElementsByTagName("a"),
                tbb_two=tb.getElementsByTagName("div"),
                tab_detail=document.getElementById("tab_detail").getElementsByTagName("div");    
                
                    tbb[0].onmouseover=function(){
                        tbb_two[0].style.transform="translateX(0px)";
                        tab_detail[0].style.display="block";
                        tab_detail[1].style.display="none";
                    };
                    tbb[1].onmouseover=function(){
                        tbb_two[0].style.transform="translateX(52px)";
                        tab_detail[0].style.display="none";
                        tab_detail[1].style.display="block";
                    };
                
            //右侧九宫格切换
            var slide=document.getElementById("service").getElementsByTagName("li"),
                detail=document.getElementById("service_detail"),
                sli=document.getElementById("service"),
                close=document.getElementById("close");
                
            for(i=0;i<4;i++){
                slide[i].onmouseover=function(){
                    sli.style.transform="translate3d(0,100%,0)";
                    detail.style.transform="translate3d(0,-100%,0)";                 
                }
            }
            close.onclick=function(){
                    sli.style.transform="translate3d(0,-100%,0)";
                    detail.style.transform="translate3d(0,100%,0)";
            }

            //价格对应改变
            var sum=document.getElementById("huafei").getElementsByTagName("select"),
                price=document.getElementById("huafei").getElementsByTagName("span");
            
            for(i=0;i<3;i++){
                sum[i].id=i;
                sum[i].onchange=function(){
                    var k=this.value; 
                        
                    switch (true) {
                    case k==10:
                        price[this.id].innerText="￥9.8-￥11.0";
                        break;
                    case k==20:
                        price[this.id].innerText="￥19.6-￥21.0";
                        break;
                    case k==30:
                        price[this.id].innerText="￥29.4-￥31.0";
                        break;
                    case k==40:
                        price[this.id].innerText="￥39.8-￥41.0";
                        break;    
                }
              }
            }
            
            //划过切换
            var huafei=document.getElementById("huafei").getElementsByTagName("dt"),
                one=document.getElementById("one"),
                two=document.getElementById("two"),
                three=document.getElementById("three");
                
                    huafei[0].onmouseover=function(){
                        one.style.display="block";
                        two.style.display="none";
                        three.style.display="none";
                    }
                     huafei[1].onmouseover=function(){
                        one.style.display="none";
                        two.style.display="block";
                        three.style.display="none";
                    }
                
                    huafei[2].onmouseover=function(){
                        one.style.display="none";
                        two.style.display="none";
                        three.style.display="block";
                    }
                
                //抢购倒计时
                function FreshTime()
                    {
                    var endtime=new Date("2019/1/1,00:00:00");//结束时间
                    var nowtime = new Date();//当前时间
                    var lefttime=parseInt((endtime.getTime()-nowtime.getTime())/1000); 
                    // d=parseInt(lefttime/3600/24);
                    h=parseInt((lefttime/3600)%24);
                    m=parseInt((lefttime/60)%60);
                    s=parseInt(lefttime%60);
                   
                    document.getElementById("hour").innerHTML=h;
                    document.getElementById("minute").innerHTML=m;
                    document.getElementById("second").innerHTML=s;
                    if(lefttime<=0){                   
                    clearInterval(sh);
                    }
                    }
                FreshTime();
                var sh;
                sh=setInterval(FreshTime,1000);
                
               //广告切换
                var prev_two=document.getElementById("prev_two"),
                    next_two=document.getElementById("next_two"),
                    block=document.getElementById("block"),

                    
                    index_two=0;
            //1.用left实现位置的变换，但切换过程不是滑动效果
                function animate(offset){                   
                    var newLeft = parseInt(block.style.left) + offset;
                    block.style.left = newLeft + 'px';
                    if(newLeft<-4000){
                    block.style.left = -1000 + 'px';
                    }
                    if(newLeft>-1000){
                    block.style.left = -5000 + 'px';
                    }
                    }
               prev_two.onclick=function(){
                  animate(1000);
            };
                next_two.onclick=function(){
                 animate(-1000);
            };

            //2.用正则和translate实现位置变化，但最后一张切换到第一张时有些突兀
             
            // function animate(offset){
            //     var transZRegex = /\.*translateX\((.*)px\)/i;
            //     var tabletParent = document.querySelector("#block");               
            //     var newLeft=Number(transZRegex.exec(tabletParent.style.transform)[1])+offset;
                
            //     block.style.transform="translateX("+newLeft+"px)";  //里面不能是单引号
            //         if(newLeft<-4000){
                    
            //         block.setAttribute("style","transform:translateX(-1000px); transition-property: transform;transition-duration: 0.6s;")
                                   
            //         }
            //         if(newLeft>-1000){
            //         block.setAttribute("style","transform:translateX(-4000px); transition-property: transform;transition-duration: 0.6s;")
                   
                    
            //         }
            // }
            //    prev_two.onclick=function(){
            //       animate(1000);
            // };
            //     next_two.onclick=function(){
            //      animate(-1000);
            // };
             
            //小轮播器的实现
            var lun_small=document.getElementById("lun_small");
            var ss=lun_small.getElementsByTagName("li");
            var dot=document.getElementById("dot_sum").getElementsByTagName("li");
            var temp="";
            var timer_two=null;
            var dot_temp="";
           
             function change(){
                temp=ss[0].className;
                ss[0].className=ss[1].className;
                ss[1].className=temp;
                dot_temp=dot[0].className;
                dot[0].className=dot[1].className;
                dot[1].className=dot_temp;
             }

             timer_two=setInterval(change,1000);

            // 页面滚动条开始
            var floornav=document.getElementById("sidebar");
            var lis=floornav.getElementsByTagName("li");
            lis[0].onclick=function(){
                
                if(document.documentElement.scrollTop){            
                    document.documentElement.scrollTop=658;
                }
                else{              
                    document.body.scrollTop=658;
                }           
            }
            lis[1].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=994;
                }
                else{
                    document.body.scrollTop=994;

                }
                }
            lis[2].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=2050;
                }
                else{
                    document.body.scrollTop=2050;
                }
                
            }
           lis[3].onclick=function(){
            if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=2448;
                }
                else{
                    document.body.scrollTop=2448;
                }
                
            }
            lis[4].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=3181;
                }
                else{
                    document.body.scrollTop=3181;
                }
                
            }
            lis[5].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=5630;
                }
                else{
                    document.body.scrollTop=5630;
                }
            }
            lis[6].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=6736;
                }
                else{
                    document.body.scrollTop=6736;
                }
            }
            lis[7].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=8364;
                }
                else{
                    document.body.scrollTop=8364;
                }
            }
            lis[8].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=8762;
                }
                else{
                    document.body.scrollTop=8762;
                }
            }
            lis[9].onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=0;
                }
                else{
                    document.body.scrollTop=0;
                }
            }
            var return_top=document.getElementById("return");
            return_top.onclick=function(){
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=0;
                }
                else{
                    document.body.scrollTop=0;
                }
            }
        

     window.onscroll=function(e){
          console.log(document.body.scrollTop);
            var Btop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var fix_search=document.getElementById("fix_search");
            if(Btop>200){
                fix_search.style.display="block";
            }
            if(Btop<200){
                fix_search.style.display="none";
            }

            if(Btop>650){
                floornav.style.display="block";
              }
            if(Btop<650){
                floornav.style.display="none";
              }
       
           if(Btop>=658&&Btop<994){
                for(var i=0;i<lis.length;i++){
                    lis[i].style.backgroundColor="#918888";
                }
                lis[0].style.backgroundColor="#d70b1c";                          
            }
            else if(Btop>=994&&Btop<2050){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[1].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=2050&&Btop<2448){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[2].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=2448&&Btop<3181){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[3].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=3181&&Btop<5630){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[4].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=5630&&Btop<6736){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[5].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=6736&&Btop<8364){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[6].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=8364&&Btop<8762){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[7].style.backgroundColor="#d70b1c";
                
            }
            else if(Btop>=8762&&Btop<10000){
                for(var i=0;i<lis.length;i++){
                        lis[i].style.backgroundColor="#918888";
                    }
                    lis[8].style.backgroundColor="#d70b1c";
                
            }
    }       

            var toolbar=document.getElementById("id_top"),
                tool_list=toolbar.getElementsByTagName("li"),
                tool_show=toolbar.getElementsByTagName("em");
                for(i=0;i<=5;i++){
                tool_list[i].id=i;
                tool_list[i].onmouseover=function(){
                    tool_show[this.id].style.left=-60+"px";
                  }
                tool_list[i].onmouseout=function(){
                    tool_show[this.id].style.left=0+"px";
                  }
                }


            var blur=document.getElementById("blur");
            var show=document.getElementById("search_list");
            blur.onfocus=function(){
                show.style.display="block";
            }
            blur.onblur=function(){
                show.style.display="none";
            }




}      


