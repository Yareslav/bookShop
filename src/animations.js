import { slideInUp,zoomIn,slideInLeft,fadeInUp,fadeOutDown } from 'react-animations';
import Radium from 'radium';
export default {
	slideInUp: {
    animation: '0.5s linear',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  },
  zoomIn:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  },
  slideInLeft:{
    animation: '1s linear',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  fadeInUp:{
    animation: '1s linear',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
  },
  fadeOutDown:{
    animation: '1s linear',
    animationName: Radium.keyframes(fadeOutDown, 'fadeOutDown')
  }
}