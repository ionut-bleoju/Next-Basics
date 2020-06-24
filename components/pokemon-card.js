import { Card, Spin } from 'antd'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

const { Meta } = Card;

export default function PokemonCard(props) {
  const [loaded, setLoaded] = useState(false)
  const [pokemon, setPokemon] = useState({ index: props.index, name: props.name })

  const image = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (image.current.complete) {
      handleLoad()
    }
  }, [loaded])

  useEffect(() => {
    setPokemon({ index: props.index, name: props.name })
  }, [props.name])

  const handleLoad = () => {
    1
    setLoaded(true)
  }

  return (
    <Card
      onClick={() => {
        router.push(`/pokemon/${pokemon.index}`)
      }}
      hoverable
      size="small"
      cover={
        <div >
          <Spin spinning={!loaded}>
            <img
              ref={image}
              style={{ textAlign: 'center', maxWidth: '100%', maxHeight: '100px' }}
              onLoad={handleLoad}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.index}.png`}
            />
          </Spin>

        </div>
      }
    >
      <Meta title={pokemon.name} style={{ textAlign: "center" }} />
    </Card>
  )
}
