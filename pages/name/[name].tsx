import { useState, useEffect } from 'react';

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse, SmallPokemon } from "@/interfaces";
import { localFavorites } from "@/utils";

interface Props {
    pokemon: Pokemon;
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id );
        setIsInFavorites( !isInFavorites );
    
        if ( isInFavorites ) return;
    
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 190,
          angle: -100,
          origin: { x: 1, y: 0 }
        })
      }
      
      const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ));
    
      useEffect(() => {
    
      }, [])
      
      return (
        <Layout title={ pokemon.name }>
          <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
            <Grid xs={ 12 } sm={ 4 }>
              <Card isHoverable css={{ padding: '30px'}}>
                <Card.Body>
                  <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                              alt={pokemon.name}
                              width="100%"
                              height={200}
                            />
                </Card.Body>
              </Card>
            </Grid>
    
            <Grid xs={ 12 } sm={ 8 }>
              <Card>
                <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Text h1 transform="capitalize">{ pokemon.name }</Text>
                  <Button color="gradient" ghost={ !isInFavorites } onClick={ onToggleFavorite }>
                    { isInFavorites? 'Favorito' : 'Guardar en favoritos' }
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Text size={30}>Sprites</Text>
                  <Container direction="row" display="flex" gap={0}>
                    <Image 
                            src={pokemon.sprites.front_default}
                            alt={ pokemon.name }
                            width={ 100 }
                            height={ 100 }
                          />
                    <Image 
                            src={pokemon.sprites.back_default}
                            alt={ pokemon.name }
                            width={ 100 }
                            height={ 100 }
                          />
                    <Image 
                            src={pokemon.sprites.front_shiny}
                            alt={ pokemon.name }
                            width={ 100 }
                            height={ 100 }
                          />
                    <Image 
                            src={pokemon.sprites.back_shiny}
                            alt={ pokemon.name }
                            width={ 100 }
                            height={ 100 }
                          />
                  </Container>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonsNames: string[] = data.results.map( poke => poke.name )

    return{
        paths: pokemonsNames.map( name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }

  return{
    props: { 
      pokemon
     }
  }
}

export default PokemonNamePage;