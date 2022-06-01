import React from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react'

const upic=localStorage.getItem('pic');
const userid=localStorage.getItem('userid');
const trigger = (
  <span> 
    { (upic && upic !==  "undefined")?(
      <Image className='c1' avatar src={require('../assets/images/user_upload/' + upic)} />
    ) : (
      <Image className='c2' avatar src={require('../assets/images/user_upload/defaultu.png').default} />
    )}
  </span>
)

  const item = [
    { key: 'userprofile', text: 'Account', icon: 'user', as: Link, to: '/userprofile' },
    { key: 'settings', text: 'Settings', icon: 'settings', as: Link, to: '/my-account'  },
    { key: 'taxmanagement', text: 'Tax Management', icon: 'settings' , as: Link, to: '/my-account' },
    { key: 'Notificationmanagement', text: 'Notification', icon: 'settings', as: Link, to: '/my-account'  },
    { key: 'TransactionCharge', text: 'Transaction Charge', icon: 'settings' , as: Link, to: '/my-account' },
    { key: 'OtherSetting', text: 'Other Setting', icon: 'settings', as: Link, to: '/my-account'  },
    { key: 'Calculator', text: 'Calculator', icon: 'calculator', as: Link, to: '/calculator'  },
    // { key: 'logout', text: 'Logout', icon: 'sign out' , as: Link, to: './logout' },
  ]

  const item1 = [
    { key: 'userprofile', text: 'Account', icon: 'user', as: Link, to: '/userprofile' },
    { key: 'settings', text: 'Settings', icon: 'settings', as: Link, to: '/my-account'  },
    { key: 'taxmanagement', text: 'Tax Management', icon: 'settings' , as: Link, to: '/my-account' },
    { key: 'Notificationmanagement', text: 'Notification', icon: 'settings', as: Link, to: '/my-account'  },
    { key: 'TransactionCharge', text: 'Transaction Charge', icon: 'settings' , as: Link, to: '/my-account' },
    { key: 'OtherSetting', text: 'Other Setting', icon: 'settings', as: Link, to: '/my-account'  },
    // { key: 'logout', text: 'Logout', icon: 'sign out' , as: Link, to: './logout' },
  ]



const DropdownImageTriggerExample = () => (
  (localStorage.getItem('role_id') === '3')?
  (
    <Dropdown
      trigger={trigger}
      options={item}
      pointing='top right'
      icon={null}
    />
  ):  (
    <Dropdown
      trigger={trigger}
      options={item1}
      pointing='top right'
      icon={null}
    />
  )
)

export default DropdownImageTriggerExample

