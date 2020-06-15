import { Card, Tag } from 'antd';
import style from '../styles/pokemon-card.module.scss'


const getClasses = {
  normal: 'gray',
  grass: 'green',
  water: 'blue',
  fire: 'red',
  poison: 'purple'
}

export default function PokemonCard({ name, stats, sprites, types }) {
  return (
    <Card
      hoverable
      style={{ width: 190 }}
      cover={<img alt="pokemon" src={sprites.front_default} />}
      title={name}
    >
      <div>
        {types.map((type) =>
          <div className={`${style.icon} ${style[type.type.name]}`} key={type.type.name}>
            <img src={`/types/${type.type.name}.svg`} />
          </div>
          // <Tag color={colors[type.type.name]} key={type.type.name}>
          //   {` ${type.type.name} `}
          // </Tag>
        )}
      </div>
      <br />
      {stats.map((stat) =>
        <div key={stat.stat.name}>
          <span>{stat.stat.name} : {stat.base_stat}</span>
        </div>
      )}
    </Card>
  )
}
