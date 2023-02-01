import React from 'react'
import CommonSection from './CommonSection'

const BlockUser = () => {
  return (
    <div className="frindRequest_holder">
    <div className="up_title_style">
      <h3>Blocked Users</h3>
    </div>
    <CommonSection
      imgSrc="/assets/userimg.png"
      title="Friends Reunion"
      subTitle="Hi Guys, Wassup!"
      btnTitle="unblock"
    />
    <CommonSection
      imgSrc="/assets/userimg.png"
      title="Friends Reunion"
      subTitle="Hi Guys, Wassup!"
      btnTitle="unblock"
    />
  </div>
  )
}

export default BlockUser