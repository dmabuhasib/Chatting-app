import React from 'react';
import CommonSection from './CommonSection';

const GroupSection = () => {
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>Groups List</h3>
        <button>Create Gropup</button>
      </div>
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="join"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="join"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="join"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="join"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="join"
      />
    </div>
  );
};

export default GroupSection;
