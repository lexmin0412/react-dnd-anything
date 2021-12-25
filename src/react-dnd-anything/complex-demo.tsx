import React from 'react'

export default function ComplexDemo() {
  return (
    <div>
      complex demo
      {
        [1,2,3,4,5].map((item)=>{
          return (
            <div className="item">
              {item}
            </div>
          )
        })
      }
    </div>
  )
}
