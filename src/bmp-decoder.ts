export class BmpDecoder {

  private readonly BMP_START_BYTE_BYTE = 10;

  public decodeBmpBuffer(bmpBuffer: Buffer): Buffer {
    const startByte = bmpBuffer[this.BMP_START_BYTE_BYTE];
    return bmpBuffer.subarray(startByte).reverse();
  }

}