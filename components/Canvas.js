import styles from "../styles/Canvas.module.css";

import { useEffect, useState } from "react";

import Web3 from "web3";
import Land from "../build/contracts/Land.json";

const Canvas = () => {
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
      <div className="hero min-h-screen bg-base-200 grid  ">
        <div className="hero-content text-center">
          {/* / */}
          <div className="drawer drawer-mobile  min-h-screen ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>

            <div className="inline-block drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li>
                  <label className="cursor-default mb-2" htmlFor="color">
                    {" "}
                    COLOR &darr;
                  </label>

                  <input type="color" id="colorpicker" />

                  <label
                    htmlFor="sizepicker"
                    className="cursor-default mb-2 mt-2"
                  >
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
                    defaultValue="1"
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
                  <button
                    onClick={() => buyHandler(landId)}
                    className="btn btn-ghost btn-outline mt-2"
                  >
                    {" "}
                    Mint to OpenSea
                  </button>
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

          <div className={styles.board}>
            <canvas className="border" id="board"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
