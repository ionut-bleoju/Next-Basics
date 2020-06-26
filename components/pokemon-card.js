import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import styles from '../styles/card.module.scss'


export default function PokemonCard(props) {
  const [loaded, setLoaded] = useState(false)
  const image = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (image.current.complete) {
      handleLoad()
    }
  }, [loaded])

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div className={styles.card}
      onClick={() => {
        router.push(`/pokemon/${props.index}`)
      }}
    >
      <div className={styles.card_content} >
        <Spin spinning={!loaded} />
        <img
          style={loaded ? {} : { display: 'none' }}
          ref={image}
          onLoad={handleLoad}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
        />
      </div>
      <div className={styles.card_description} >{props.name}</div>
    </div>
  )
}
