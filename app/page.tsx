export const dynamic = 'force-dynamic'
import Image from "next/image";
import Link from 'next/link'
import Fig1 from '../public/introduction/fig1.webp'
import Fig2 from '../public/introduction/fig2.webp'

export default async function Home() {

    return (
      <main style={
        { background: "yellow" }
      } className="relative flex min-h-screen flex-col items-center justify-center">
        <h1 style={{ fontSize: "5em", fontWeight: "bold" }}>ポップアップ広告消し</h1>
        <Link href="/speed">
          <Image src={Fig1} alt="速さチャレンジ" />
        </Link>
        <Link href="/aiming">
          <Image src={Fig2} alt="細かさチャレンジ" />
        </Link>
        <p style={{ fontSize: "3em", fontWeight: "bold", color: "red" }}>▲挑戦したいモードをタップ▲</p>
      </main>
  )
}
