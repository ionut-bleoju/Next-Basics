import { Card, Spin } from 'antd'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

const { Meta } = Card;

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
    <Card
      onClick={() => {
        router.push(`/pokemon/${props.index}`)
      }}
      key={props.name}
      hoverable
      size="small"
      style={{ width: '100px', margin: '5px' }}
      cover={
        <div>
          <Spin
            style={loaded ? { display: 'none' } : { display: 'block' }}
          />
          <img
            ref={image}
            style={loaded ? {} : { display: 'none' }}
            onLoad={handleLoad}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
          />
        </div>
      }
    >
      <Meta title={props.name} style={{ textAlign: "center" }} />
    </Card>
  )
}
