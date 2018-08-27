document.querySelector("#camera-upload").addEventListener("click",() => {
    var video = document.querySelector("#camera-video");
    var canvas = document.querySelector("#camera-canvas");
    if (video == null) {
        alert("upload file video == null")
        return;
    }
    // create formdata
    var formData = new FormData();
    var dataURL = canvas.toDataURL();
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];

    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }

    var file = new Blob([new Uint8Array(array)], {
        type: 'image/png'
    });

    // append file
    formData.append("img", file);
    fetch('/camera/upload', {
            method: 'POST',
            cache: "no-cache",
            body: formData
        })
        .then(response => {
            confirm("Upload Complete");
            // release resource
            var video = document.querySelector("#camera-video");
            var canvas = document.querySelector('#camera-canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            window.URL.revokeObjectURL(video.src);

        }).catch(error => {
            alert(error)
        })
})