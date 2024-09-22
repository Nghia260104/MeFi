export const getFontFamily = (weight, style = '') => {
  const baseFont = 'Poppins';
  switch (style) {
    case '':
      switch (weight) {
        case 100:
          return `${baseFont}-Thin`;
        case 200:
          return `${baseFont}-ExtraLight`;
        case 300:
          return `${baseFont}-Light`;
        case 400:
          return `${baseFont}-Regular`;
        case 500:
          return `${baseFont}-Medium`;
        case 600:
          return `${baseFont}-SemiBold`;
        case 700:
          return `${baseFont}-Bold`;
        case 800:
          return `${baseFont}-ExtraBold`;
        case 900:
          return `${baseFont}-Black`;
        default:
          return `${baseFont}-Regular`;
      }
    case 'Italic':
      switch (weight) {
        case 100:
          return `${baseFont}-ThinItalic`;
        case 200:
          return `${baseFont}-ExtraLightItalic`;
        case 300:
          return `${baseFont}-LightItalic`;
        case 400:
          return `${baseFont}-Italic`;
        case 500:
          return `${baseFont}-MediumItalic`;
        case 600:
          return `${baseFont}-SemiBoldItalic`;
        case 700:
          return `${baseFont}-BoldItalic`;
        case 800:
          return `${baseFont}-ExtraBoldItalic`;
        case 900:
          return `${baseFont}-BlackItalic`;
        default:
          return `${baseFont}-Italic`;
      }
    default:
      switch (weight) {
        case 100:
          return `${baseFont}-Thin`;
        case 200:
          return `${baseFont}-ExtraLight`;
        case 300:
          return `${baseFont}-Light`;
        case 400:
          return `${baseFont}-Regular`;
        case 500:
          return `${baseFont}-Medium`;
        case 600:
          return `${baseFont}-SemiBold`;
        case 700:
          return `${baseFont}-Bold`;
        case 800:
          return `${baseFont}-ExtraBold`;
        case 900:
          return `${baseFont}-Black`;
        default:
          return `${baseFont}-Regular`;
      }
  }
};
