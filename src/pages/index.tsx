import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { DialogInput } from '@/components/dialog-search'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { GetServerSidePropsContext } from 'next'
import { getAccessToken, getGameClips, getTopGames } from '@/shared/api/axios'
import EmblaCarousel from '@/components/carousel/EmblaCarousel'

const inter = Inter({ subsets: ['latin'] })
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.id as string
  const accessToken = await getAccessToken()

  const games = await getTopGames(accessToken)
  const clip = getGameClips(accessToken)

  return { props: { games } }
}

export default function Home({ games, clip }: any) {
  const navigate = useRouter()

  console.log('CLIP', clip)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[2000px] overflow-hidden">
        <section className="w-full">
          <div className="flex flex-col items-center justify-end bg-background pb-10 pt-24 md:py-12">
            <div className="flex flex-col items-center justify-center ">
              <h1 className="pb-4 pt-12 text-9xl xl:text-6xl md:pt-16 md:text-4xl ">
                Discover Twitch Vods
              </h1>
              <p className="pb-10 text-center text-2xl lg:text-base md:pb-6 md:text-sm">
                Watch twitch past broadcasts streams Start by Typing twitch username...
              </p>
            </div>
            <DialogInput>
              <Button className="bg-button-foreground  px-40 text-xl text-text text-white lg:text-base md:px-32 md:text-sm sm:px-28">
                <MagnifyingGlassIcon className="h-6 w-6 pr-1" />
                Search Steamer
              </Button>
            </DialogInput>
          </div>
        </section>
        <section className="relative flex w-full flex-col items-center justify-center rounded-2xl ">
          <div>
            <h1 className="pb-3 text-7xl text-white xl:text-6xl md:text-4xl">Top streams Now</h1>
          </div>
          <EmblaCarousel slides={games}></EmblaCarousel>
        </section>
        <section></section>
      </main>
    </>
  )
}
