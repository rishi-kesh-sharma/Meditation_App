import state from "./state.js";
import DOMFunctions from "./DOM.js";
import data from "./data.js";

const { initialState, stateAndFunctions } = state;
const { createElement, appendClass, appendElements, setTextContent } =
  DOMFunctions;
const { timeDurations, videoLinks } = data;

// create all elements
const createAllElements = () => {
  const mainContainer = createElement("div");
  const bgVideo = document.querySelector("video.bg-video");
  const sunnyAudio = createElement("audio");
  sunnyAudio.src = "./assets/audio/waves.mp3";
  sunnyAudio.loop = "loop";

  const rightContainer = createElement("div");
  const centerContainer = createElement("div");
  const leftContainer = createElement("div");

  const timeDurationBtns = data.timeDurations.map((timeDuration) => {
    const item = createElement("button");
    return item;
  });

  const controlBtn = createElement("button");
  const controlBtnIcon = createElement("i");
  const timeDisp = createElement("p");

  const rainyThemeBtn = createElement("button");
  const sunnyThemeBtn = createElement("button");
  const cloudIcon = createElement("i");
  const sunnyDayIcon = createElement("i");

  return {
    mainContainer,
    bgVideo,
    sunnyAudio,
    rightContainer,
    timeDurationBtns,
    centerContainer,
    leftContainer,
    controlBtn,
    controlBtnIcon,
    rainyThemeBtn,
    sunnyThemeBtn,
    cloudIcon,
    sunnyDayIcon,
    timeDisp,
  };
};

// append all classes
const appendAllClasses = (allElements) => {
  const {
    mainContainer,
    bgVideo,
    sunnyAudio,
    rightContainer,
    timeDurationBtns,
    centerContainer,
    leftContainer,
    controlBtn,
    controlBtnIcon,
    rainyThemeBtn,
    sunnyThemeBtn,
    cloudIcon,
    sunnyDayIcon,
    timeDisp,
  } = allElements;

  appendClass(bgVideo, "bg-video");
  appendClass(sunnyAudio, "sunny-audio");
  appendClass(mainContainer, "main-container");
  appendClass(leftContainer, "container-left", "show");
  appendClass(centerContainer, "container-center");
  appendClass(rightContainer, "container-right", "show");

  timeDurationBtns.map((item) => {
    appendClass(item, "btn", "time-duration-btn");
  });

  appendClass(controlBtn, "btn", "control-btn");
  appendClass(controlBtnIcon, "fa-solid", "fa-play", "icon");
  appendClass(timeDisp, "time-disp");

  appendClass(rainyThemeBtn, "theme-btn", "rainy-theme-btn");
  appendClass(sunnyThemeBtn, "theme-btn", "sunny-theme-btn");
  appendClass(cloudIcon, "icon", "fa-solid", "fa-cloud-showers-heavy");
  appendClass(sunnyDayIcon, "icon", "fa-solid", "fa-sun");
};

// set all text contents
const setAllTextContents = (allElements) => {
  const { timeDurationBtns, timeDisp } = allElements;

  timeDurationBtns.map((item, index) => {
    setTextContent(item, `${timeDurations[index]} Minutes`);
  });
  setTextContent(timeDisp, "00:00");
};

// append all elements
const appendAllElements = (allElements) => {
  const {
    mainContainer,
    bgVideo,
    rightContainer,
    timeDurationBtns,
    centerContainer,
    leftContainer,
    controlBtn,
    controlBtnIcon,
    rainyThemeBtn,
    sunnyThemeBtn,
    cloudIcon,
    sunnyDayIcon,
    timeDisp,
    sunnyAudio,
  } = allElements;

  //append sunny audio
  appendElements(document.body, sunnyAudio);

  // append to left container
  appendElements(leftContainer, ...timeDurationBtns);

  //  append to center container
  appendElements(centerContainer, controlBtn, timeDisp);

  // append to controlBtn
  appendElements(controlBtn, controlBtnIcon);

  // append to right container
  appendElements(rightContainer, rainyThemeBtn, sunnyThemeBtn);

  //   append to rainy theme btn
  appendElements(rainyThemeBtn, cloudIcon);

  // append to sunny theme btn
  appendElements(sunnyThemeBtn, sunnyDayIcon);

  // append to main container
  appendElements(mainContainer, leftContainer, centerContainer, rightContainer);

  appendElements(document.body, bgVideo);

  // append to body
  appendElements(document.body, mainContainer);
};

// create DOM
const createDOM = () => {
  // create all elements
  const allElements = createAllElements();

  // append all classes
  appendAllClasses(allElements);

  // set all text contents
  setAllTextContents(allElements);

  // append all elements
  appendAllElements(allElements);

  const { rainyThemeBtn, sunnyThemeBtn, controlBtn, timeDurationBtns } =
    allElements;
  return { rainyThemeBtn, sunnyThemeBtn, controlBtn, timeDurationBtns };
};

// setting event listeners
const setEventListeners = (elements) => {
  const { timeDurationBtns, rainyThemeBtn, sunnyThemeBtn, controlBtn } =
    elements;

  // listening click event for time duration buttons
  timeDurationBtns.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      alert(
        "setting time duration for " + data.timeDurations[index] + " minutes"
      );
      stateAndFunctions.updateState({
        ...initialState,
        time: data.timeDurations[index],
      });
    });
  });

  // listening click event for rainy theme button
  rainyThemeBtn.addEventListener("click", (e) => {
    stateAndFunctions.updateState({ ...initialState, weather: "rainy" });
    alert("setting weather to rainy");
    // DOMFunctions.manipulateDOM();
    console.log(stateAndFunctions.state);
  });

  // listening click event for sunny theme button
  sunnyThemeBtn.addEventListener("click", (e) => {
    alert("setting  weather to sunny");
    stateAndFunctions.updateState({ ...initialState, weather: "sunny" });
  });

  // listening click event for control button

  controlBtn.addEventListener("click", (e) => {
    DOMFunctions.manipulateDOM();
  });
};

// initialize function
const init = () => {
  const elements = createDOM();
  setEventListeners(elements);
};

// initialize
init();
