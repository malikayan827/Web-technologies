
    document.addEventListener("DOMContentLoaded", function () {
        
        var logo = document.getElementById("logo");

        
        var mainMenu = document.querySelector(".menu");

        
        var menuVisible = true;

        
        logo.addEventListener("click", function () {
            if (menuVisible) {
                
                mainMenu.style.display = "none";
            } else {
                
                mainMenu.style.display = "flex"; 
            }

            
            menuVisible = !menuVisible;
        });
    });

