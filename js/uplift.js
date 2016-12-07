$(function () {

    var body = $('#body');
    var closeBtn = $('.closebtn');
    var search = $('.search');
    var fullscreen = $('.fullscreen');
    var timeOut;
    //handlers
    fullscreen.on('click', maxDisplay)
    search.on('keydown', submit);
    closeBtn.on('click', closeNav);
    body.on('click', openNav);


    // Find the right method, call on correct element
    function launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    function searchPhotos(value) {
        timeOut = setInterval(function () {
            body.removeClass('fadeIn');
            //I'm having to keep the browser from caching this request by using a random number
            //var url = "https://source.unsplash.com/collection/139015/" + Math.floor(Math.random() * 1000);
            var url = "https://source.unsplash.com/1600x900/?" + value + "=" + Math.floor(Math.random() * 1000);

            //to detect load of image I use an image tag. Once loaded, add image url to html background. 
            //This will get loaded from browser cache
            $('<img/>').attr('src', url).on('load', function () {
                $(this).remove(); // prevent memory leaks
                $('.loader').hide();
                body.css('background-image', 'url(' + url + ')');
                body.addClass('fadeIn');

            });

        }, 10000);
    }



    /* Open when someone clicks on the span element */
    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeNav(event) {
        document.getElementById("myNav").style.width = "0%";
        if (event) {
            event.stopPropagation();
        }

    }

    function submit(event) {
        //Check if the return key was submited
        if (event.keyCode == 13) {
            //Clear the timeout, close form, and search for photos
            $('.loader').show();
            clearInterval(timeOut);
            searchPhotos(search.val());
            closeNav();

        }
    }
    function maxDisplay(event) {

        fullscreen.fadeOut();

        launchIntoFullscreen(body[0]);
        if (event) {
            event.stopPropagation();
        }

    }
    
    $(document).keyup(function (e) {
        //Check to see if escape key is pressed to exit out fullscreen mode
        if (e.keyCode == 27) { 
            fullscreen.fadeIn();
            
        }
    });
    //Begin to find photos
    searchPhotos(search.val());



});
