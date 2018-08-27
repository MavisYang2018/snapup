var cameraTemplate = {};
cameraTemplate.template = $(".main").html(
    `
    <div class="camera-layout">
      <div lcass="camera-content">
        <video id="camera-video" class="mobile-col-camera-video" autoplay></video>
        <canvas id="camera-canvas" class="mobile-col-camera-canvas"></canvas>
        <div id="btn" class="btn-box">
          <button id="camera-snap" class="mobile-col-camera-btn-snap noselect">Snap Photo</button>
          <button id="camera-upload" class="mobile-col-camera-btn-upload noselect">Upload</button>
          </div>
        </div>
    </div>
    `
);
