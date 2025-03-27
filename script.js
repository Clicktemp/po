let countdown = 45;
let timerInterval;
let videoTimer;

function startIframes() {
    clearInterval(timerInterval);
    countdown = 45;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    
    const url = document.getElementById('urlInput').value;
    const container = document.getElementById('container');
    container.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.onload = () => automateIframe(iframe);
        container.appendChild(iframe);
    }
    
    setTimeout(startIframes, 45000);
}

function updateTimer() {
    document.getElementById('timer').textContent = `Timer: ${countdown}s`;
    countdown--;
}

function automateIframe(iframe) {
    setInterval(() => {
        iframe.contentWindow.scrollBy(0, 50);
    }, 1000);
    
    setInterval(() => {
        const elements = iframe.contentWindow.document.querySelectorAll('body *');
        elements.forEach(el => {
            if (el.textContent.includes('2025')) {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                });
                el.dispatchEvent(event);
            }
        });
    }, 2000);
}

function openVideoPage() {
    document.getElementById('videoPage').style.display = 'block';
    startVideoEmbed();
}

function closeVideoPage() {
    document.getElementById('videoPage').style.display = 'none';
}

function startVideoEmbed() {
    clearTimeout(videoTimer);
    const videoUrl = document.getElementById('videoInput').value;
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '';
    
    let embedUrl = "";
    if (videoUrl.includes("youtube.com/watch?v=")) {
        const videoId = new URL(videoUrl).searchParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtu.be/")) {
        const videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/embed/")) {
        embedUrl = videoUrl;
    }
    
    if (embedUrl) {
        for (let i = 0; i < 2; i++) {
            const iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.width = "560";
            iframe.height = "315";
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; encrypted-media";
            videoContainer.appendChild(iframe);
        }
    } else {
        alert("Invalid YouTube URL or Embed Link");
    }
    
    videoTimer = setTimeout(startVideoEmbed, 45000);
}
