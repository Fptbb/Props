const V = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
const VD = 1;
const VM = 4;
if(Storage && window.localStorage && window.localStorage instanceof Storage) {
    // Check if it's 1st of April
    var date = new Date();
    // Note that months are zero indexed
    if(date.getDate() == VD && date.getMonth() == VM-1) {
        // If local storage does not work, rickroll will simply never occur
        // this is a safety measure to prevent people being rickrolled forever
        localStorage.LOCAL_STORAGE_WORKS = true;
        // This will be called as an on click handler for anchor elements
        function rickroller(event) {
            //console.info("Rickrolling!");
            if(localStorage.VAt) {
                //console.warn("Rickrolling canceled!");
                return true;
            }
            // Remember that user was rickrolled
            localStorage.VAt = new Date().getTime();
            event.preventDefault();
            // New tab links go to a new tab
            if(this.target=="_blank") {
                window.open(V);
            }
            else
                window.location.href = V;
            return false;   
        }
        
        if(localStorage.LOCAL_STORAGE_WORKS && !localStorage.VAt) {
            var ar=[];
            //console.info("Initiating rickroll!");
            // Get all links as an array
            ar.push.apply(ar, document.querySelectorAll("a"));

            ar.forEach((link)=>{
                // Skip links that do not lead outside
                if(link.href.indexOf("http")!=0&&link.href.indexOf("//")!=0)  {
                    //console.log(link.href, link.href.indexOf("http"), link.href.indexOf("//"));
                    return;                
                }
                link.addEventListener("click", rickroller);
            });
        }
        else {
            //console.info("Já foi rickrolled hoje, perdeu a graça!");
        }
    }
    else {
        // console.info("Não é primeiro de abril :(", date.getDate(),date.getMonth());
    }
}
else {
    //console.warn("Local storage === false");
}
// Alternative RR
var pattern = ['r', 'i', 'c', 'k'];
var current = 0;

var keyHandler = function (event) {

	// If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

	// If complete, alert and reset
	if (pattern.length === current) {
		current = 0;
		window.location.href = V
	}

};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);
