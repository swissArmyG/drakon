export const FadedBgButton = ({ buttonText, buttonTextPosition, onClick, isDisabled, isFlipped, width }) => {
  return (
    <section className={`FadedBgButton --button ${isDisabled ? 'isDisabled' : ''}`}>
      <h1 className={`--button-text ${isDisabled ? 'isDisabled' : ''}`}
        onClick={onClick}
        style={{
          "top": `${buttonTextPosition || "-28%"}`,
          "width": `${width}`
        }}>
        {buttonText}
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 391 95"
        version="1.1"
        className={`${isFlipped ? 'isFlipped' : ''}`}
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
          "width": `${width}`
        }}
      >
        <g id="PAGE-INTERACTION" serifId="PAGE INTERACTION" transform="matrix(1,0,0,1,-182,-503)">
          <g transform="matrix(1,0,0,1,127,-263)">
            <g>
              <g transform="matrix(1,0,0,1,-501,-315)">
                <g transform="matrix(1,-0,-0,1,556,1081)">
                  <use xlinkHref="#_Image1" x="33" y="7" />
                </g>
              </g>
              <g transform="matrix(1,0,0,1,193,527)">
              </g>
            </g>
          </g>
        </g>
        <defs>
          <image id="_Image1" xlinkHref="data:image/png;base64,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"/>
      </defs>
    </svg>
    </section>
  )
}