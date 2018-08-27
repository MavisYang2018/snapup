var cameraCamera = {};
cameraCamera.camera = () => {
    // Grab elements, create settings, etc.
    var video = document.querySelector('#camera-video');
    var constraints;

    navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
            var device = devices.filter(function (device) {
                if (device.kind == 'videoinput') {
                    return device;
                }
            });

            if (device.length > 1) {
                constraints = {
                    video: {
                        mandatory: {
                            sourceId: device[1].deviceId ? device[1].deviceId : null
                        }
                    },
                    audio: false
                };

                if (window.iOS) {
                    constraints.video.facingMode = 'environment';
                }
            } else if (device.length) {
                constraints = {
                    video: {
                        mandatory: {
                            sourceId: device[0].deviceId ? device[0].deviceId : null
                        }
                    },
                    audio: false
                };

                if (window.iOS) {
                    constraints.video.facingMode = 'environment';
                }
            }

            // Get access to the camera!
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                });
            } else {
                alert("mediaDevices Error");
            }

        })

    // Elements for taking the snapshot
    var canvas = document.querySelector('#camera-canvas');
    var context = canvas.getContext('2d');

    //init width and height
    video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }, false);

    // Trigger photo take
    document.querySelector("#camera-snap").addEventListener("click", () => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    });
}

cameraCamera.camera();