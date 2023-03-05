export class AudioAnalyzer {
  #ctx: AudioContext;
  #analyzerNode: AnalyserNode;
  #sourceNode: MediaElementAudioSourceNode;

  constructor(audio: HTMLAudioElement) {
    this.#ctx = new AudioContext();
    this.#analyzerNode = this.#ctx.createAnalyser();
    this.#sourceNode = this.#ctx.createMediaElementSource(audio);

    this.#analyzerNode.minDecibels = -60;
    this.#analyzerNode.smoothingTimeConstant = 0.8;

    this.#sourceNode.connect(this.#analyzerNode);
    this.#sourceNode.connect(this.#ctx.destination);
  }

  getFft(): Uint8Array {
    const freqData = new Uint8Array(this.#analyzerNode.frequencyBinCount);
    this.#analyzerNode.getByteFrequencyData(freqData);
    return freqData;
  }
}
