import React from 'react'

export default function Table ({ data }) {
  return (
    <div>
      {data.map(item => (
        <div>
          <div className='responsive'>
            <div className='gallery'>
              <a href={item.link} target='_blank'>
                <img src={item.img} style={{ width: 500, height: 300 }} />
              </a>
              <div className='desc'>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  Price: ${item.price}
                </div>
                <div style={{ fontSize: '12px' }}>Zipcode: {item.zipcode}</div>
                <div style={{ fontSize: '11px', wordWrap: 'break-word' }}>
                  Street: {item.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
