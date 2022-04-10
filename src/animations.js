import { slideInUp,zoomIn,slideInLeft,fadeInUp,fadeOutDown,slideInRight,slideOutLeft,slideOutRight,fadeInRight,fadeOutRight } from 'react-animations';
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
  },
  slideInRight:{
    animation: '1s linear',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  slideOutLeft:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(slideOutLeft, 'slideOutLeft')
  },
  slideOutRight:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(slideOutRight, 'slideOutRight')
  },
  slideInLeftFast:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
  },
  slideInRightFast:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  },
  fadeInRight:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
  },
  fadeOutRight:{
    animation: '0.5s linear',
    animationName: Radium.keyframes(fadeOutRight, 'fadeOutRight')
  }
}