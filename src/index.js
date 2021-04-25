import QRious from "QRious";
import QrScanner from "qr-scanner";
import qrScannerWorkerSource from "../node_modules/qr-scanner/qr-scanner-worker.min.js";
QrScanner.WORKER_PATH = URL.createObjectURL(new Blob([qrScannerWorkerSource]));

// Test import of styles
import "@/styles/index.scss";

const app = document.querySelector("#root");
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

const init = () => {
  //drawer part
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var canvas = document.querySelector("canvas");
  qr = new QRious({
    element: canvas,
    value: `${urlParams.get("id")}${urlParams.get("secret")}`,
  });

  // scanner part
  qrScanner = new QrScanner(videoElem, (result) =>
    console.log("decoded qr code:", result)
  );

  QrScanner.scanImage(image)
    .then((result) => console.log(result))
    .catch((error) => console.log(error || "No QR code found."));
};

const scan = () => {
  qrScanner.start();
};

const stop = () => {
  qrScanner.stop();
};

init();
window.save = save;
window.scan = scan;
window.stop = stop;
