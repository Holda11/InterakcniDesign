import React from 'react'
import style from '../Styles/Searcher.module.scss'

const Searcher = () => {
  return (
    <form className={style["Searcher"]}>
        <div className={style["Searcher__Inputs"]}>
            <label htmlFor="Odkud">Odkud</label>
            <input type="text" name='Odkud' />
            <label htmlFor="Kam">Kam</label>
            <input type="text" name='Kam'/>
            <label htmlFor="Odlet">Odlet</label>
            <input type="text" name='Odlet'/>
            <label htmlFor="Prilet">Přílet</label>
            <input type="text" name='Prilet'/>
        </div>
        <div className={style["Searcher__Bottom"]}>
            <div>Hledání letenek</div>
            <div>
                <button>Hledat</button>
            </div>
        </div>
    </form>
  )
}

export default Searcher