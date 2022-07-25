import 'expo-dev-client';
import React, {useState} from 'react';
import AgoraUIKit, { AgoraUIKitProps } from 'agora-rn-uikit';

const VideoCallAPP = () => {
  const [videoCall, setVideoCall] = useState(true);
  const props: AgoraUIKitProps = {
    connectionData: {
      appId: '5c32e646cbd44a3b8cc3a8bea285c777',
      channel: 'doctorapp',
    },
    rtcCallbacks: {
      EndCall: () => setVideoCall(false),
    },
  };

  return videoCall ? (
    <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} />
  ) : null;
};

export default VideoCallAPP