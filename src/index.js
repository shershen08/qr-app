// var director = require("director");
// var router = new director.http.Router();

import QRious from "QRious";
import QrScanner from "qr-scanner";
import qrScannerWorkerSource from "../node_modules/qr-scanner/qr-scanner-worker.min.js";
QrScanner.WORKER_PATH = URL.createObjectURL(new Blob([qrScannerWorkerSource]));

import "@/styles/index.scss";

const videoElem = document.querySelector("video");
var qr;
var qrScanner;

const save = () => {
  var link = document.createElement("a");
  link.innerHTML = "download image";
  link.style.display = "none";
  link.addEventListener(
    "click",
    function (ev) {
      link.href = qr.toDataURL();
      link.download = "qr-code.png";
    },
    false
  );
  document.body.appendChild(link);
  link.click();
};

const initDrawer = () => {
  //drawer part
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var canvas = document.querySelector("canvas");
  qr = new QRious({
    element: canvas,
    size: 365,
    value: `${urlParams.get("id")}${urlParams.get("secret")}`,
  });
};

const initScanner = () => {
  // scanner part
  qrScanner = new QrScanner(videoElem, (result) => {
    console.log("decoded qr code:", result);
    document.querySelector("#details").textContent = result;
  });
};

const scanStart = () => {
  qrScanner.start();
};

const stop = () => {
  qrScanner.stop();
};

window.save = save;
window.scanStart = scanStart;
window.stop = stop;

const view = function () {
  console.log("view");
  document.title = "View QR code";
  document.querySelector(".view").style.display = "block";
  document.querySelector(".scan").style.display = "none";
  initDrawer();
  if (qrScanner) {
    qrScanner.stop();
  }
};
const scan = function () {
  console.log("view");
  document.title = "scan QR code";
  document.querySelector(".scan").style.display = "block";
  document.querySelector(".view").style.display = "none";
  initScanner();
};

var routes = {
  "/view": view,
  "/scan": scan,
};

var router = Router(routes);
router.init();
// document.addEventListener("DOMContentLoaded", function () {
// var router = new director.Router(routes);
// //.configure({});
// router.init();
// // });
