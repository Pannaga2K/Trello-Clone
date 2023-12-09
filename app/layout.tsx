import Modal from '@/components/Modal'
import './globals.css'

export const metadata = {
	title: 'Trello',
	description: '',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className='' >{children}<Modal /></body>
		</html>
	)
}
