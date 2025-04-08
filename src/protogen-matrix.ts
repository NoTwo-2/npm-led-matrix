import { GpioMapping, LedMatrix, LedMatrixInstance, MatrixOptions, RuntimeFlag, RuntimeOptions } from "rpi-led-matrix";
import * as fs from "fs";
import { BmpDecoder } from "./bmp-decoder";

const matrixOptions: MatrixOptions = {
  ...LedMatrix.defaultMatrixOptions(),
  rows: 32,
  cols: 64,
  chainLength: 2,
  hardwareMapping: GpioMapping.AdafruitHat
};

const runtimeOptions: RuntimeOptions = {
  ...LedMatrix.defaultRuntimeOptions(),
  dropPrivileges: RuntimeFlag.Off,
  gpioSlowdown: 2
};

export class ProtogenMatrix {

  private readonly FACE_PATH = '/home/owo/led-npm/src/rsc/Cheesed.bmp';
  private readonly IMG_DISPLAY_TIME_MS = 100000;

  private readonly protogenMatrix: LedMatrixInstance;
  
  constructor(
    private readonly bmpDecoder: BmpDecoder
  ) {
    this.protogenMatrix = new LedMatrix(
      matrixOptions,
      runtimeOptions
    );
    fs.readFile(this.FACE_PATH, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        this.displayFace(data);
      }
    });
  }

  public displayFace(faceData: Buffer): void {
    const data = this.bmpDecoder.decodeBmpBuffer(faceData);
    this.protogenMatrix
      .fgColor(0x00ff00)
      .drawBuffer(data)
      .sync();
    setTimeout(() => {this.protogenMatrix.clear().sync();}, this.IMG_DISPLAY_TIME_MS);
  }

}

const mask = new ProtogenMatrix(new BmpDecoder);