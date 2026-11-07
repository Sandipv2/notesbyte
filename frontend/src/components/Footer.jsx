import React from 'react'

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className='bg-slate-950 text-center py-5'>
      Made with Love ❤️ © {year}
    </div>
  )
}

export default Footer