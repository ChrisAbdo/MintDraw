import styles from "../styles/Canvas.module.css";
import { useEffect, useState } from "react";

const Canvas = () => {
  //   const [canvas, setCanvas] = useState(false);

  //   function canvasAppear() {
  //     setCanvas(true);
  //   }

  useEffect(() => {
    const colorpicker = document.getElementById("colorpicker");
    const sizepicker = document.getElementById("sizepicker");
    const resoPickerDiv = document.getElementById("resoPicker");
    const initReso = document.getElementById("submitReso");
    const widthPicker = document.getElementById("widthPicker");
    const heightPicker = document.getElementById("heightPicker");
    const canvas = document.getElementById("board");
    const saveBtn = document.getElementById("saveButton");
    const ctx = canvas.getContext("2d");

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    let CANVAS_WIDTH = 8;
    let CANVAS_HEIGHT = 8;
    let scale = Math.floor(window.innerWidth / (CANVAS_WIDTH * 2.5));
    let currentWidth = CANVAS_WIDTH * scale;
    let currentHeight = CANVAS_HEIGHT * scale;

    let color = colorpicker.value;
    let size = sizepicker.value * scale;

    let isPressed = false;
    let currentX = 0;
    let currentY = 0;

    canvas.width = CANVAS_WIDTH * scale;
    canvas.height = CANVAS_HEIGHT * scale;
    canvas.style.width = `${CANVAS_WIDTH * scale}px`;
    canvas.style.height = `${CANVAS_HEIGHT * scale}px`;

    ctx.mozImageSmoothingEnabled = false; // firefox
    ctx.imageSmoothingEnabled = false;

    initReso.onclick = function (e) {
      CANVAS_WIDTH = parseInt(widthPicker.value);
      CANVAS_HEIGHT = parseInt(heightPicker.value);

      scale = Math.floor(window.innerWidth / (CANVAS_WIDTH * 2.5));
      color = colorpicker.value;
      size = sizepicker.value * scale;

      currentWidth = CANVAS_WIDTH * scale;
      currentHeight = CANVAS_HEIGHT * scale;
      canvas.width = CANVAS_WIDTH * scale;
      canvas.height = CANVAS_HEIGHT * scale;
      canvas.style.width = `${CANVAS_WIDTH * scale}px`;
      canvas.style.height = `${CANVAS_HEIGHT * scale}px`;

      resoPickerDiv.style.display = "none";
      draw();
    };

    window.onmousedown = function () {
      isPressed = true;
    };

    window.onmouseup = function () {
      isPressed = false;
    };

    colorpicker.oninput = function () {
      color = this.value;
    };

    sizepicker.oninput = function () {
      size = this.value * scale;
    };

    saveBtn.addEventListener("click", function (event) {
      tempCtx.mozImageSmoothingEnabled = false; // firefox
      tempCtx.imageSmoothingEnabled = false;
      tempCanvas.width = CANVAS_WIDTH;
      tempCanvas.height = CANVAS_HEIGHT;
      tempCtx.drawImage(
        canvas,
        0,
        0,
        CANVAS_WIDTH * scale,
        CANVAS_HEIGHT * scale,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      let download = document.getElementById("downloadLink");
      let image = tempCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      let img = new Image();
      download.setAttribute("href", image);
    });

    function getMousePos(canvas, event) {
      let rect = canvas.getBoundingClientRect();

      currentX = Math.floor((event.clientX - rect.left) / scale) * scale;
      currentY = Math.floor((event.clientY - rect.top) / scale) * scale;
    }

    function draw(event) {
      if (isPressed) {
        // getMousePos(canvas, window);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(currentX, currentY, size, size);
        ctx.fill();
      }

      window.requestAnimationFrame(draw);
    }

    window.onmousemove = function (event) {
      getMousePos(canvas, event);
    };
  }, []);

  return (
    <>
      {/* <div className="bg-[#161516]">
        <div className="flex justify-center items-center" id="resoPicker">
          <h3 className="flex"> Choose Canvas Dimensions</h3>
          <label for="widthPicker"> Size </label>
          <input
            type="number"
            id="widthPicker"
            name="width"
            class="resoPicker__input"
            placeholder="Width"
          />
          <input
            type="number"
            id="heightPicker"
            name="height"
            class="resoPicker__input"
            placeholder="Height"
          />
          <button type="submit" class="resoPicker__submit" id="submitReso">
            {" "}
            CREATE{" "}
          </button>
        </div>

        <nav className={styles.nav}>
          <label for="color"> COLOR </label>
          <input type="color" id="colorpicker" />

          <label for="sizepicker"> BRUSH SIZE </label>
          <input type="number" id="sizepicker" min="1" max="20" value="1" />

          <a href="" id="downloadLink" download="image.png">
            <button id="saveButton" download="image.png">
              {" "}
              SAVE{" "}
            </button>
          </a>
        </nav>

        <div class="drawingBoard">
          <canvas id="board"></canvas>
        </div>

        <script src="script.js" async defer></script>
      </div> */}
      <div className="hero min-h-screen bg-base-200 grid  ">
        <div className="hero-content text-center">
          {/* / */}
          <div class="drawer drawer-mobile  min-h-screen ">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center">
              <label
                for="my-drawer-2"
                class="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>

            {/* only make this div appear after submitting button */}

            <div class="inline-block drawer-side">
              <label for="my-drawer-2" class="drawer-overlay"></label>
              <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li>
                  <label className="cursor-default mb-2" for="color">
                    {" "}
                    COLOR &darr;
                  </label>

                  <input type="color" id="colorpicker" />

                  <label for="sizepicker" className="cursor-default mb-2 mt-2">
                    {" "}
                    BRUSH SIZE{" "}
                  </label>

                  <input
                    type="number"
                    id="sizepicker"
                    min="1"
                    max="20"
                    // value="1"
                    // set initial value to 1
                    value="1"
                    className="border"
                  />

                  <a
                    className="mt-2 btn btn-ghost btn-outline"
                    href=""
                    id="downloadLink"
                    download="image.png"
                  >
                    <button id="saveButton" download="image.png">
                      {" "}
                      Download{" "}
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-md" id="resoPicker">
            <h1 className="text-5xl font-bold">Choose Canvas Dimensions</h1>
            <p className="py-6">
              Recommended sizes: 25x25 , 50x50, 75x75, 100x100, 125x125, 150x150
            </p>

            <input
              type="number"
              min="1"
              id="widthPicker"
              placeholder="Width"
              className="input input-bordered w-full max-w-xs mb-2"
            />
            <input
              type="number"
              id="heightPicker"
              min="1"
              placeholder="Height"
              className="input input-bordered w-full max-w-xs mb-2"
            />
            <button
              type="submit"
              id="submitReso"
              className="btn btn-ghost btn-outline w-full max-w-xs"
            >
              CREATE
            </button>
          </div>

          {/* <nav className="nav">
            <label for="color"> COLOR </label>
            <input type="color" id="colorpicker" />

            <label for="sizepicker"> BRUSH SIZE </label>
            <input type="number" id="sizepicker" min="1" max="20" value="1" />

            <a href="" id="downloadLink" download="image.png">
              <button id="saveButton" download="image.png">
                {" "}
                SAVE{" "}
              </button>
            </a>
          </nav> */}

          <div className={styles.board}>
            <canvas className="border" id="board"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
