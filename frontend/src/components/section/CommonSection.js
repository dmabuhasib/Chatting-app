import React from 'react';

const CommonSection = (
  { imgSrc, imgAlt, title, subTitle, btnTitle, btnTitle2, onClick, onClick2, style, style2, dClick },
  props
) => {
  return (
    <div onClick={dClick} className="section_box">
      <div className="title_box">
        <div className="img_style">
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <div className="title_inner">
          <div className="title_style">
            <h3>{title}</h3>
            <p style={{width:'110px', overflow:'hidden'}}>{subTitle}</p>
          </div>
          {btnTitle? (

          <div className="btn_style">
            <button style={style2}    onClick={onClick}>{btnTitle}</button>
            {btnTitle2? <button style={style} onClick={onClick2} className="rejectBtn_style">{btnTitle2}</button> : null}
          </div>
          ): null}
          <>
          </>
        </div>
      </div>
    </div>
  );
};

export default CommonSection;
