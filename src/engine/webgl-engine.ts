import { Observable, Subscriber } from 'rxjs';
import { Nullable } from '/common/type';
import { Scene } from '/scene/scene';

export interface IWebGLEngineOptions extends WebGLContextAttributes {}

export class WebGLEngine {
  private _canvas: Nullable<HTMLCanvasElement> = null;

  public get canvas(): Nullable<HTMLCanvasElement> {
    return this._canvas;
  }

  private _context: Nullable<WebGL2RenderingContext> = null;

  private _webGLVersion: number = 2.0;

  public scenes: Scene[] = [];

  private _onResizeSubscriber!: Subscriber<WebGLEngine>;

  public onResizeObservable = new Observable<WebGLEngine>((subscriber) => {
    this._onResizeSubscriber = subscriber;
  });

  constructor(
    canvas?: Nullable<HTMLCanvasElement>,
    options: IWebGLEngineOptions = {},
  ) {
    if (!canvas) {
      return;
    }

    this._canvas = canvas;
    this._context = canvas.getContext('webgl2', options)!;
    this._webGLVersion = 2.0;

    if (!this._context) {
      throw new Error('WebGL2 is not supported');
    }

    // Ensures a consistent color space unpacking of textures cross browser.
    this._context.pixelStorei(this._context.UNPACK_FLIP_Y_WEBGL, true);

    this.resize();


  }

  public resize() {
    let width: number;
    let height: number;

    if (this._canvas) {
      width = this._canvas.clientWidth;
      height = this._canvas.clientHeight;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    this.setSize(width, height);
  }

  public setSize(width: number, height: number): boolean {
    if (!this._canvas) {
      return false;
    }

    width = Math.floor(width);
    height = Math.floor(height);

    if (this._canvas.width === width && this._canvas.height === height) {
      return false;
    }

    this._canvas.width = width;
    this._canvas.height = height;

    this._onResizeSubscriber.next(this);

    return true;
  }
}
