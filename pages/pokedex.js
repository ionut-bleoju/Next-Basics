import { useRouter } from 'next/router'
import { Card } from 'antd';
import { getAllPokemons } from '../lib/pokemon'
import Layout from '../components/layout'

const { Meta } = Card;

const container = {
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
  padding: '5px',
  justifyContent: 'space-evenly'
}

export default (props) => {
  const router = useRouter()

  return (
    <Layout>
      <div style={container}>
        {props.pokemons.map((pokemon, index) =>
          <Card
            onClick={() => {
              router.push(`/pokemon/${index + 1}`)
            }}
            key={pokemon.name}
            hoverable
            size="small"
            style={{ width: '100px', margin: '5px' }}
            cover={<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}></img>}
          >
            <Meta title={pokemon.name} style={{ textAlign: "center" }} />
          </Card>
        )}

      </div>
    </Layout >
  )
}

export async function getStaticProps(context) {
  const pokemons = await getAllPokemons()

  return {
    props: {
      pokemons: pokemons
    },
  }
}