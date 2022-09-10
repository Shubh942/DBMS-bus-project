let bus=document.getElementById('upper');

        window.addEventListener('scroll',function(){
            let value=window.scrollY;
            
            bus.style.marginLeft=value*4+'px';
        });