let bus=document.getElementById('upper');

        window.addEventListener('scroll',function(){
            let value=window.scrollY;
            
            bus.style.marginLeft=value*2.5+'px';
        });
