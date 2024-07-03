import { useEffect, useState } from "react";
import "./App.css";
import CustomSelect1 from "./components/CustomSelect1";
import CustomSelect2 from "./components/CustomSelect2";
import Navbar from "./components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { useSpeech } from "react-text-to-speech";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedLang, setSelectedLang] = useState("fa");
  const [selectTargetLang, setSelectTargetLang] = useState("en");
  const [isCopied, setIsCopied] = useState(false);
  const [textDirection, setTextDirection] = useState(false);
  const [outputDir, setOutputDir] = useState(false);

  useEffect(() => {
    if (selectedLang === "fa" || selectedLang === "ar-sa")
      setTextDirection(true);
    else setTextDirection(false);
  }, [selectedLang]);

  useEffect(() => {
    if (selectTargetLang === "fa" || selectTargetLang === "ar-sa")
      setOutputDir(true);
    else setOutputDir(false);
  }, [selectTargetLang]);

  // Use the useSpeech hook to handle text-to-speech functionality
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: outputText,
    pitch: 1,
    rate: 1,
    volume: 1,
    lang: selectTargetLang,
    voiceURI: "",
    highlightText: false,
  });

  /*   const translateText = () => {
    if (inputText.trim() === "") {
      toast.error("لطفا فیلد را پر کنید");
      return;
    }

    googleTranslateApi(inputText, selectedLang, selectTargetLang).then((res) =>
      setOutputText(res.text)
    );
  }; */

  const clearFeild = () => {
    setInputText("");
    setOutputText("");
    setIsCopied(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(outputText);
    toast.success("متن با موفقیت کپی شد");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const inputChangeHandler = (e) => {
    if (e.target.value === "") {
      clearFeild();
    } else {
      setInputText(e.target.value);
      googleTranslateApi(e.target.value, selectedLang, selectTargetLang).then(
        (res) => setOutputText(res.text)
      );
    }
  };

  const speechHandler = () => {
    start();
  };

  // Google Translate API
  const googleTranslateApi = (text, sourceLang, targetLang) => {
    return fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(
        text
      )}`
    )
      .then((response) => response.json())
      .then((data) => ({
        text: data[0][0][0],
      }));
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
      <div className="flex items-center justify-center md:h-screen md:bg-white bg-slate-100 p-4">
        <div className="md:p-4 md:bg-slate-100 md:rounded md:shadow md:w-[90%] w-full">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="md:hidden col-span-full">
              <Navbar />
            </div>
            <div className="col-span-full md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CustomSelect1
                  setSelectedLang={setSelectedLang}
                  text="انتخاب زبان"
                />
              </div>
              <textarea
                className={`border-2 resize-none border-slate-200 focus:border-slate-300 p-2 rounded outline-none text-gray-600 ${
                  textDirection ? "text-start" : "ltr-dir"
                } font-semibold w-full`}
                id="input_text"
                placeholder={textDirection ? "ورودی..." : "Input..."}
                rows="10"
                spellCheck="false"
                value={inputText}
                onChange={inputChangeHandler}
                required
              ></textarea>
            </div>
            <div className="col-span-full md:col-span-2">
              <div className="flex md:flex-col md:gap-8 items-center justify-around">
                {/* <button
                  onClick={translateText}
                  className="bg-sky-500 hover:bg-sky-600 transition rounded p-2 text-white font-semibold w-full flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-translate"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
                  </svg>{" "}
                  ترجمه
                </button> */}

                <button
                  onClick={clearFeild}
                  className="text-gray-500 hover:text-red-500 transition flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                  پاک کردن
                </button>

                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:green-500 transition flex items-center gap-2"
                >
                  {isCopied ? (
                    <span className="text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-clipboard2-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                        <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-clipboard2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                      </svg>
                    </span>
                  )}
                  کپی
                </button>
              </div>
            </div>
            <div className="col-span-full md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CustomSelect2
                  setSelectTargetLang={setSelectTargetLang}
                  text="به چه زبانی ترجمه شود"
                />
                <button onClick={speechHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-volume-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                    <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11" />
                  </svg>
                </button>
              </div>
              <textarea
                className={`border-2 resize-none border-slate-200 focus:border-slate-300 p-2 rounded outline-none text-gray-600 font-semibold w-full ${
                  outputDir ? "text-start" : "ltr-dir"
                }`}
                id="output_text"
                placeholder={outputDir ? "خروجی..." : "Output..."}
                rows="10"
                value={outputText}
                readOnly
                spellCheck="false"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
