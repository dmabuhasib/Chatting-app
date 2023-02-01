import React from 'react'
import CommonSection from './CommonSection'

const UserList = () => {
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>User List</h3>
      </div>
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="+"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="+"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="+"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="+"
      />
      <CommonSection
        imgSrc="/assets/userimg.png"
        title="Friends Reunion"
        subTitle="Hi Guys, Wassup!"
        btnTitle="+"
      />
    </div>
  )
}

export default UserList