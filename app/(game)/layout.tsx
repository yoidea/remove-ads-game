export const metadata = {
  title: "広告消しチャレンジ",
  description: "速く正確にポップアップ広告を閉じるゲーム",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
