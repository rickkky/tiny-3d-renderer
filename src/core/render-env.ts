import { ObjectBase } from '/common/base';

export class RenderEnv extends ObjectBase {
  static CNAME = 'Context';

  #device!: GPUDevice;

  #canvas!: HTMLCanvasElement;

  #context!: GPUCanvasContext;

  #format: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();

  #bindGroup!: GPUBindGroup;

  async init(canvas: HTMLCanvasElement) {
    await this.#initDevice();
    this.#initCanvas(canvas);
  }

  async #initDevice() {
    if (!navigator.gpu) {
      throw new Error('WebGPU is not supported');
    }

    const adapter = await navigator.gpu.requestAdapter();

    if (!adapter) {
      throw new Error('Failed to request GPU adapter');
    }

    const device = await adapter.requestDevice();

    if (!device) {
      throw new Error('Failed to request GPU device');
    }

    this.#device = device;
  }

  #initCanvas(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;

    const context = this.#canvas.getContext('webgpu');

    if (!context) {
      throw new Error('Failed to get WebGPU context');
    }

    this.#context = context;

    this.#context.configure({
      device: this.#device,
      format: this.#format,
    });
  }
}
