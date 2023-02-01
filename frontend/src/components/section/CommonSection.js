import React from 'react';

const CommonSection = (
  { imgSrc, imgAlt, title, subTitle, btnTitle, btnTitle2 },
  props
) => {
  return (
    <div className="section_box">
      <div className="title_box">
        <div className="img_style">
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <div className="title_inner">
          <div className="title_style">
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </div>
          {btnTitle? (

          <div className="btn_style">
            <button>{btnTitle}</button>
            {btnTitle2? <button className="rejectBtn_style">{btnTitle2}</button> : null}
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
