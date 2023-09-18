const animations = {
  spin: `@keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }`,
  fade: `@keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }`,
  flash: `@keyframes flash {
    0% {
      color: #fff;
    }
  }`,
};

const main1 = "#1A120B";
const main2 = "#3C2A21";
const main3 = "#D5CEA3";
const main4 = "#E5E5CB";
export const preference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const colors = {
  main1: preference ? main4 : main1,
  main2: preference ? main3 : main2,
  main3: preference ? main2 : main3,
  main4: preference ? main1 : main4,
  success: "#42C619",
  error: "#eb3223",
  background1: "#F8F8F8",
  background2: "#EFEFEF",
  background3: "#E0E0E0",
  background4: "#BCBCBC",
  background5: "#828282",
  background6: "#333333",
  background7: "#0F0F0F",
  translucent: "rgba(0, 0, 0, 0.25)",
};

const fontFamily = {
  gothamBold: "GothamBold",
  gothamLight: "GothamLight",
  spoqaRegular: "SpoqaRegular",
  spoqaLight: "SpoqaLight",
};

const fontSizes = {
  title: "64px",
  subTitle: "22px",
  text: "16px",
  subText: "14px",
  description: "8px",
};

const commons = {
  boxShadow: `padding: 8px 16px; box-shadow: 0 0 8px ${colors.main1}; border-radius: 8px;`,
  ellipsis: "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
};

const theme = {
  animations,
  colors,
  fontFamily,
  fontSizes,
  commons,
};

export default theme;
