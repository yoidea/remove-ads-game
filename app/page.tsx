export const dynamic = "force-dynamic"
import Image from "next/image"
import Link from "next/link"
import Fig1 from "../public/introduction/fig1.webp"
import Fig2 from "../public/introduction/fig2.webp"

export default async function Home() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center lg:my-20 max-w-3xl mx-auto">
			<h1 className="text-4xl sm:text-7xl font-bold">ポップアップ広告消し</h1>
			<Link href="/speed">
				<Image src={Fig1} alt="速さチャレンジ" />
			</Link>
			<Link href="/aiming">
				<Image src={Fig2} alt="細かさチャレンジ" />
			</Link>
			<p
				className="text-3xl sm:text-4xl md:text-5xl font-bold"
				style={{ color: "red" }}
			>
				▲挑戦したいモードをタップ▲
			</p>
		</main>
	)
}
