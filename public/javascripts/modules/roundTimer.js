function timer()  {

    // timer for new round
    const countDownDate = new Date("Apr 1, 2019 20:00:00").getTime();
    
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const avail = !(document.getElementById("countdown__timer") === null);
        if(avail) {
            document.getElementById("countdown__timer").innerHTML = days + "d " + hours + "h " +
                minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(x);
                $('.hide__this').fadeOut();
                document.getElementById("countdown__timer").innerHTML = "Please refresh this Page";
            }
        }
    }, 1000);


}

export default timer;
