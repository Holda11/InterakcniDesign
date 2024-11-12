import React from 'react'
import Fly from './Fly'

const Flyes = () => {

  return (
    <div>
        <div>
            <button>Nejlepší</button>
            <button>Nejlevnější</button>
            <button>Nejkratší</button>
        </div>
        <div>
            <Fly/>
            <button>Rezervovat</button>
            <strong>17 000Kč</strong>
            <div>Airolink</div>
        </div>
    </div>
  )
}

export default Flyes