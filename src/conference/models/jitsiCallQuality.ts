interface CallQualityBandwidth {
  download?: unknown;
  upload: number;
}

interface CallQualityAudio {
  upload: number;
  download: number;
}

interface CallQualityVideo {
  upload: number;
  download: number;
}

interface CallQualityBitrate {
  upload: number;
  download: number;
  audio: CallQualityAudio;
  video: CallQualityVideo;
}

interface CallQualityPacketLoss {
  total: number;
  download: number;
  upload: number;
}

interface CallQualityResolutionItem {
  height: number;
  width: number;
}

interface CallQualityResolution {
  [key: string]: Record<string, CallQualityResolutionItem>;
}

interface CallQualityFramerate {}

interface CallQualityCodecItem {
  audio: string;
  video: string;
}

interface CallQualityCodec {
  [key: string]: Record<string, CallQualityCodecItem>;
}

interface CallQualityTransport {
  ip: string;
  type: string;
  localip: string;
  p2p: boolean;
  localCandidateType: string;
  remoteCandidateType: string;
  networkType: string;
  rtt: number;
}

interface CallQualityAvgAudioLevels {}

export interface CallQualityLocal {
  connectionQuality: number;
  jvbRTT: number;
  bridgeCount: number;
  serverRegion: string;
  maxEnabledResolution: number;
  bandwidth: CallQualityBandwidth;
  bitrate: CallQualityBitrate;
  packetLoss: CallQualityPacketLoss;
  resolution: CallQualityResolution;
  framerate: CallQualityFramerate;
  codec: CallQualityCodec;
  transport: CallQualityTransport[];
  avgAudioLevels: CallQualityAvgAudioLevels;
}

export interface CallQualityRemote {
  bitrate: CallQualityBitrate;
  packetLoss: CallQualityPacketLoss;
  connectionQuality: number;
  jvbRTT: number;
  serverRegion: string;
  maxEnabledResolution: number;
}
