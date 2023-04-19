import { FC, PropsWithChildren } from "react"
import Head from "next/head"
import { ScriptProps } from "next/script"
import { NavBar } from '../ui';

// interface Props { //YO YA USO LA INTERFACE SriptProps que es la recomendada ahora
//     title?: string;
// }

export const Layout: FC<ScriptProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Jorge Lleonart"></meta>
                <meta name="description" content={`Información sobre el pokemon: ${title}`}></meta>
                <meta name="keywords" content={`${title}, pokemon, pokedex`}></meta>
            </Head>

            <NavBar></NavBar>

            <main style={{ padding: '0px 20px'}}>
                { children }
            </main>
        </>
    )
}
