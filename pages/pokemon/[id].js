import React from 'react'
import { getPokemon } from '../../lib/pokemon'
import Layout from '../../components/layout'
import styles from '../../styles/pokemon.module.scss'
import { Row, Col } from 'antd';


class Pokemon extends React.Component {
  static async getInitialProps(context) {
    let pokemon = null;
    try {
      pokemon = await getPokemon(context.query.id)
    } catch (error) {
      console.log(error);
    }

    return {
      id: pokemon.id,
      name: pokemon.name,
      stats: pokemon.stats,
      types: pokemon.types,
    }
  }

  render() {
    const availableStats = ['Health', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']

    return (
      <div className={styles.background}>
        <Layout >
          <div className={styles.container} >
            <img alt="pokemon" src={`https://pokeres.bastionbot.org/images/pokemon/${this.props.id}.png`} />
            <div className={styles.info}>
              <h1>{this.props.name}</h1>
              <div className={styles.types}>
                {this.props.types.map((type) =>
                  <div className={`${styles.icon} ${styles[type.type.name]}`} key={type.type.name}>
                    <img src={`/types/${type.type.name}.svg`} />
                  </div>
                )}
              </div>
              <hr style={{ height: "1px" }} />

              <ul className={styles.stats}>
                {
                  this.props.stats.map((stat, index) => {
                    return (
                      <Row key={stat.stat.name}>
                        <Col span={8} offset={4}>{availableStats[index]}</Col>
                        <Col span={8} offset={4}>{stat.base_stat}</Col>
                      </Row>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}

export default Pokemon
