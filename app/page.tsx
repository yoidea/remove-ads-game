export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default async function Home() {

    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <Link href="/speed">speed</Link>
        <Link href="/aiming">aiming</Link>
      </main>
  )
}
